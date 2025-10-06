# Quick Start Guide

## Getting Started with AICloud

This guide will help you get up and running with AICloud in minutes.

## Step 1: Installation

1. Clone the repository:
```bash
git clone https://github.com/wdranjeet/aicloud.git
cd aicloud
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment:
```bash
cp .env.example .env
```

## Step 2: Start the Platform

### Option A: Development Mode

1. Start the API server:
```bash
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm install
npm start
```

### Option B: Docker (Recommended)

```bash
docker-compose up -d
```

## Step 3: Create Your First Account

1. Open http://localhost:3001 in your browser
2. Click "Register" to create a new account
3. Enter your email, password, and name
4. Click "Register" to create your account

## Step 4: Create Your First Project

### Using the Web Dashboard

1. After logging in, go to "Projects"
2. Click "+ New Project"
3. Enter project details:
   - Project Name: "my-first-app"
   - Framework: Choose your framework (e.g., React)
   - Repository: (optional) Your Git repository URL
4. Click "Create Project"

### Using the CLI

1. Install the CLI globally:
```bash
npm install -g .
```

2. Login:
```bash
aicloud login
```

3. Initialize a project:
```bash
aicloud init --name "my-first-app" --framework react
```

## Step 5: Deploy Your Application

### Using the Web Dashboard

1. Go to "Projects"
2. Click on your project
3. Click "View Deployments"
4. Click "+ New Deployment"
5. Monitor the build logs in real-time

### Using the CLI

```bash
aicloud deploy --project <your-project-id>
```

## Step 6: View Your Deployment

Once the deployment is complete:

1. Check the deployment logs for the URL
2. Your app will be available at: `https://<your-project>.aicloud.app`
3. You can view build logs anytime using the dashboard or CLI

## Next Steps

- Configure custom domains
- Set up automatic deployments from Git
- Explore environment variables
- Add team members to your projects

## Troubleshooting

### API Server Not Starting

- Check if port 3000 is available
- Verify Node.js version (18 or higher required)
- Check the error logs in console

### Frontend Not Loading

- Ensure API server is running
- Clear browser cache
- Check console for errors

### CLI Login Issues

- Verify API server is running on http://localhost:3000
- Check network connectivity
- Try logging in via web dashboard first

## Getting Help

- Documentation: Check the `/docs` folder
- Issues: Open an issue on GitHub
- Community: Join our Discord server (coming soon)
