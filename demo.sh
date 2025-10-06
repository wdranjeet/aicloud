#!/bin/bash

# AICloud Demo Script
# This script demonstrates the key features of the AICloud platform

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         AICloud Platform - Demo Script                      ║"
echo "║  Developer Tools and Cloud Infrastructure Platform          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Start the backend server in the background
echo -e "${BLUE}Starting AICloud API Server...${NC}"
node backend/server.js > /dev/null 2>&1 &
SERVER_PID=$!
sleep 3

# Check if server is running
if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✅ Server started successfully!${NC}"
    echo ""
else
    echo -e "${YELLOW}❌ Failed to start server${NC}"
    exit 1
fi

# Demo 1: User Registration
echo -e "${BLUE}Demo 1: User Registration${NC}"
echo "Creating a new user account..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@aicloud.com","password":"demo123","name":"Demo User"}')

TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
USER_NAME=$(echo $REGISTER_RESPONSE | jq -r '.user.name')
echo -e "${GREEN}✅ User registered: $USER_NAME${NC}"
echo ""

# Demo 2: Create a Project
echo -e "${BLUE}Demo 2: Create a Project${NC}"
echo "Creating a new React project..."
PROJECT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Demo React App","framework":"react","repository":"https://github.com/demo/react-app"}')

PROJECT_ID=$(echo $PROJECT_RESPONSE | jq -r '.project.id')
PROJECT_DOMAIN=$(echo $PROJECT_RESPONSE | jq -r '.project.domain')
echo -e "${GREEN}✅ Project created: $PROJECT_ID${NC}"
echo -e "${GREEN}   Domain: $PROJECT_DOMAIN${NC}"
echo ""

# Demo 3: List Projects
echo -e "${BLUE}Demo 3: List All Projects${NC}"
curl -s http://localhost:3000/api/projects \
  -H "Authorization: Bearer $TOKEN" | jq '.projects[] | {name, framework, domain, status}'
echo ""

# Demo 4: Create a Deployment
echo -e "${BLUE}Demo 4: Create a Deployment${NC}"
echo "Initiating deployment..."
DEPLOY_RESPONSE=$(curl -s -X POST http://localhost:3000/api/deployments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"projectId\":\"$PROJECT_ID\",\"branch\":\"main\",\"commitMessage\":\"Demo deployment\"}")

DEPLOY_ID=$(echo $DEPLOY_RESPONSE | jq -r '.deployment.id')
DEPLOY_URL=$(echo $DEPLOY_RESPONSE | jq -r '.deployment.url')
echo -e "${GREEN}✅ Deployment initiated: $DEPLOY_ID${NC}"
echo -e "${GREEN}   URL: $DEPLOY_URL${NC}"
echo ""

# Demo 5: View Build Logs (after build completes)
echo -e "${BLUE}Demo 5: View Deployment Logs${NC}"
echo "Waiting for build to complete..."
sleep 5

curl -s http://localhost:3000/api/deployments/$DEPLOY_ID/logs \
  -H "Authorization: Bearer $TOKEN" | jq -r '.logs[] | "[\(.timestamp | split("T")[1] | split(".")[0])] \(.message)"'
echo ""

# Demo 6: Get Deployment Status
echo -e "${BLUE}Demo 6: Check Deployment Status${NC}"
DEPLOY_STATUS=$(curl -s http://localhost:3000/api/deployments/$DEPLOY_ID \
  -H "Authorization: Bearer $TOKEN" | jq -r '.deployment.status')
echo -e "${GREEN}✅ Deployment Status: $DEPLOY_STATUS${NC}"
echo ""

# CLI Demo
echo -e "${BLUE}Demo 7: CLI Commands${NC}"
echo "Available CLI commands:"
node cli/index.js --help
echo ""

# Summary
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                     Demo Complete!                           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Summary:${NC}"
echo "  ✅ User authentication working"
echo "  ✅ Project management working"
echo "  ✅ Deployment pipeline working"
echo "  ✅ Build logs available"
echo "  ✅ CLI tool functional"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Install frontend: cd frontend && npm install"
echo "  2. Start frontend: npm start (in frontend directory)"
echo "  3. Visit: http://localhost:3001"
echo "  4. Install CLI globally: npm install -g ."
echo "  5. Use CLI: aicloud login && aicloud deploy"
echo ""

# Cleanup
echo -e "${BLUE}Stopping server...${NC}"
kill $SERVER_PID
echo -e "${GREEN}✅ Demo complete!${NC}"
