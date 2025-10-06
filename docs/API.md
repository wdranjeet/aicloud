# AICloud API Reference

Complete API documentation for AICloud platform.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Endpoints

### Authentication

#### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Email already exists or validation error
- `500 Internal Server Error` - Server error

---

#### Login User

Authenticate an existing user.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid credentials
- `500 Internal Server Error` - Server error

---

### Projects

#### List All Projects

Get all projects for the authenticated user.

**Endpoint:** `GET /projects`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "projects": [
    {
      "id": "proj_123",
      "name": "My Web App",
      "repository": "https://github.com/user/repo",
      "framework": "react",
      "userId": "user_123",
      "domain": "my-web-app.aicloud.app",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "status": "active"
    }
  ]
}
```

---

#### Get Single Project

Get details of a specific project.

**Endpoint:** `GET /projects/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "project": {
    "id": "proj_123",
    "name": "My Web App",
    "repository": "https://github.com/user/repo",
    "framework": "react",
    "userId": "user_123",
    "domain": "my-web-app.aicloud.app",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "status": "active"
  }
}
```

**Error Responses:**
- `404 Not Found` - Project not found
- `401 Unauthorized` - Invalid or missing token

---

#### Create Project

Create a new project.

**Endpoint:** `POST /projects`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "My New Project",
  "repository": "https://github.com/user/new-repo",
  "framework": "react"
}
```

**Response:** `201 Created`
```json
{
  "message": "Project created successfully",
  "project": {
    "id": "proj_456",
    "name": "My New Project",
    "repository": "https://github.com/user/new-repo",
    "framework": "react",
    "userId": "user_123",
    "domain": "my-new-project.aicloud.app",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "status": "active"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Invalid or missing token

---

#### Update Project

Update an existing project.

**Endpoint:** `PUT /projects/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "framework": "next"
}
```

**Response:** `200 OK`
```json
{
  "message": "Project updated successfully",
  "project": {
    "id": "proj_123",
    "name": "Updated Project Name",
    "framework": "next",
    ...
  }
}
```

**Error Responses:**
- `404 Not Found` - Project not found
- `401 Unauthorized` - Invalid or missing token

---

#### Delete Project

Delete a project.

**Endpoint:** `DELETE /projects/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "message": "Project deleted successfully"
}
```

**Error Responses:**
- `404 Not Found` - Project not found
- `401 Unauthorized` - Invalid or missing token

---

### Deployments

#### List Deployments for Project

Get all deployments for a specific project.

**Endpoint:** `GET /deployments/project/:projectId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "deployments": [
    {
      "id": "dep_123",
      "projectId": "proj_123",
      "branch": "main",
      "commitSha": "abc123",
      "commitMessage": "Update homepage",
      "status": "completed",
      "url": "https://proj-123-1234567890.aicloud.app",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "userId": "user_123"
    }
  ]
}
```

---

#### Get Single Deployment

Get details of a specific deployment.

**Endpoint:** `GET /deployments/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "deployment": {
    "id": "dep_123",
    "projectId": "proj_123",
    "branch": "main",
    "commitSha": "abc123",
    "commitMessage": "Update homepage",
    "status": "completed",
    "url": "https://proj-123-1234567890.aicloud.app",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "userId": "user_123"
  }
}
```

---

#### Create Deployment

Create a new deployment.

**Endpoint:** `POST /deployments`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "projectId": "proj_123",
  "branch": "main",
  "commitSha": "abc123",
  "commitMessage": "Deploy latest changes"
}
```

**Response:** `201 Created`
```json
{
  "message": "Deployment initiated",
  "deployment": {
    "id": "dep_456",
    "projectId": "proj_123",
    "branch": "main",
    "commitSha": "abc123",
    "commitMessage": "Deploy latest changes",
    "status": "pending",
    "url": "https://proj-123-1234567890.aicloud.app",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "userId": "user_123",
    "buildLogs": []
  }
}
```

---

#### Get Deployment Logs

Get build logs for a deployment.

**Endpoint:** `GET /deployments/:id/logs`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "logs": [
    {
      "timestamp": "2024-01-01T00:00:00.000Z",
      "message": "Starting build process..."
    },
    {
      "timestamp": "2024-01-01T00:00:05.000Z",
      "message": "Installing dependencies..."
    },
    {
      "timestamp": "2024-01-01T00:00:10.000Z",
      "message": "Build completed successfully",
      "level": "info"
    }
  ]
}
```

---

#### Cancel Deployment

Cancel a running deployment.

**Endpoint:** `POST /deployments/:id/cancel`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "message": "Deployment cancelled",
  "deployment": {
    "id": "dep_123",
    "status": "cancelled",
    ...
  }
}
```

**Error Responses:**
- `400 Bad Request` - Cannot cancel completed or failed deployment
- `404 Not Found` - Deployment not found

---

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request or validation error
- `401 Unauthorized` - Missing or invalid authentication
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

Currently no rate limiting is implemented. This will be added in future versions.

## Webhooks

Webhook support is planned for future releases to notify external services of deployment events.

## SDK Support

Official SDKs planned for:
- JavaScript/TypeScript
- Python
- Go
- Ruby

## Need Help?

- Check the [main documentation](../README.md)
- Open an issue on GitHub
- Contact support
