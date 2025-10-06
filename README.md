# ⚡ AICloud

AICloud provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web application - just like Vercel and Netlify.

## 🚀 Features

- **Instant Deployments**: Deploy your applications in seconds with our streamlined deployment pipeline
- **Project Management**: Organize and manage multiple projects from a single dashboard
- **Real-time Build Logs**: Monitor your deployments with live build logs
- **CLI Tool**: Deploy and manage your applications from the command line
- **Multiple Frameworks**: Support for React, Vue, Next.js, Nuxt.js, and static sites
- **Custom Domains**: Automatic domain generation for each project
- **Authentication**: Secure user authentication and authorization
- **RESTful API**: Full-featured API for programmatic access

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (optional, for containerized deployment)

## 🛠️ Installation

### Clone the repository

```bash
git clone https://github.com/wdranjeet/aicloud.git
cd aicloud
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🏃 Running the Application

### Development Mode

#### Start the backend API server

```bash
npm run dev
```

The API server will start on http://localhost:3000

#### Start the frontend (in a new terminal)

```bash
cd frontend
npm install
npm start
```

The frontend will start on http://localhost:3001

### Production Mode

#### Using Docker Compose

```bash
docker-compose up -d
```

This will start both the API server and frontend in production mode.

#### Manual Production Build

```bash
# Build frontend
npm run build:frontend

# Start backend
npm start
```

## 📦 CLI Usage

The AICloud CLI allows you to deploy and manage your applications from the command line.

### Install CLI globally

```bash
npm install -g .
```

### Available Commands

#### Login to AICloud

```bash
aicloud login
```

#### Initialize a new project

```bash
aicloud init
# Or with options
aicloud init --name "My Project" --framework react
```

#### Deploy your application

```bash
aicloud deploy
# Or specify project
aicloud deploy --project <project-id> --branch main
```

#### List all projects

```bash
aicloud projects
```

#### View deployment logs

```bash
aicloud logs <deployment-id>
```

## 🏗️ Architecture

AICloud consists of three main components:

### 1. Backend API (`/backend`)
- **Express.js** server providing RESTful API
- Authentication with JWT
- Project and deployment management
- Build pipeline orchestration

### 2. Frontend Dashboard (`/frontend`)
- **React** application for web interface
- Project and deployment visualization
- Real-time build log viewing
- User authentication

### 3. CLI Tool (`/cli`)
- Command-line interface for deployments
- Project management from terminal
- Authentication and configuration

## 📚 API Documentation

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Projects

#### List Projects
```http
GET /api/projects
Authorization: Bearer <token>
```

#### Create Project
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Project",
  "framework": "react",
  "repository": "https://github.com/user/repo"
}
```

#### Update Project
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Project Name"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

### Deployments

#### Create Deployment
```http
POST /api/deployments
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "project-id",
  "branch": "main",
  "commitMessage": "Deploy latest changes"
}
```

#### Get Deployment Logs
```http
GET /api/deployments/:id/logs
Authorization: Bearer <token>
```

#### Cancel Deployment
```http
POST /api/deployments/:id/cancel
Authorization: Bearer <token>
```

## 🔧 Configuration

### Environment Variables

- `PORT` - API server port (default: 3000)
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - Database connection string (optional)
- `STORAGE_PATH` - Path for deployment artifacts

### Project Configuration

Create an `aicloud.json` file in your project root:

```json
{
  "projectId": "your-project-id",
  "framework": "react",
  "buildCommand": "npm run build",
  "outputDirectory": "build"
}
```

## 🧪 Testing

```bash
npm test
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.

## 🎯 Roadmap

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] GitHub/GitLab integration for automatic deployments
- [ ] Custom domain support with SSL
- [ ] Environment variables management
- [ ] Team collaboration features
- [ ] Analytics and monitoring
- [ ] Serverless functions support
- [ ] Edge deployment
- [ ] CI/CD pipeline integration

## 🙏 Acknowledgments

Inspired by industry-leading platforms like Vercel and Netlify.
