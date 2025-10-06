# Deployment Guide

## Overview

AICloud supports multiple deployment methods for various frameworks and project types.

## Supported Frameworks

- **Static HTML**: Pure HTML, CSS, JavaScript
- **React**: Create React App, Vite
- **Vue**: Vue CLI, Vite
- **Next.js**: Server-side rendered React applications
- **Nuxt.js**: Server-side rendered Vue applications

## Deployment Methods

### 1. CLI Deployment

The fastest way to deploy your application.

#### Prerequisites

- AICloud CLI installed globally
- Authenticated user account
- Project initialized

#### Steps

1. Navigate to your project directory:
```bash
cd /path/to/your/project
```

2. Initialize AICloud (first time only):
```bash
aicloud init
```

3. Deploy:
```bash
aicloud deploy
```

### 2. Web Dashboard Deployment

Manual deployment through the web interface.

#### Steps

1. Login to AICloud Dashboard
2. Navigate to Projects
3. Select or create a project
4. Click "View Deployments"
5. Click "+ New Deployment"
6. Monitor build progress in real-time

### 3. Git Integration (Coming Soon)

Automatic deployments on git push.

## Build Configuration

### Static Sites

No build configuration needed. Place your `index.html` in the root directory.

### React (Create React App)

Default configuration works out of the box:
- Build command: `npm run build`
- Output directory: `build`

### React (Vite)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Next.js

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Vue (Vue CLI)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Nuxt.js

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".nuxt"
}
```

## Environment Variables

Configure environment variables for your deployments:

1. Create a `.env` file in your project root
2. Add your variables:
```
API_URL=https://api.example.com
STRIPE_KEY=pk_test_xxx
```

3. Access in your code:
```javascript
const apiUrl = process.env.API_URL;
```

## Custom Domains

### Adding a Custom Domain

1. Go to Project Settings
2. Navigate to "Domains"
3. Click "Add Domain"
4. Enter your domain name
5. Configure DNS records as shown

### DNS Configuration

Point your domain to AICloud:

```
Type: CNAME
Name: www
Value: aicloud.app
```

For apex domains:
```
Type: A
Name: @
Value: <provided-ip-address>
```

## SSL Certificates

SSL certificates are automatically provisioned for:
- Default `.aicloud.app` domains
- Custom domains (coming soon)

## Deployment Lifecycle

1. **Pending**: Deployment queued
2. **Building**: Installing dependencies and building
3. **Deploying**: Uploading to CDN
4. **Completed**: Live and accessible
5. **Failed**: Build or deployment error

## Build Cache

AICloud caches:
- Node modules
- Build artifacts
- Static assets

This speeds up subsequent deployments significantly.

## Rollback

To rollback to a previous deployment:

1. Navigate to Deployments
2. Find the working deployment
3. Click "Promote to Production"

## Advanced Configuration

### aicloud.json

Create this file in your project root for advanced configuration:

```json
{
  "projectId": "your-project-id",
  "framework": "react",
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "nodeVersion": "18",
  "installCommand": "npm install",
  "environmentVariables": {
    "NODE_ENV": "production"
  }
}
```

## Troubleshooting

### Build Failures

1. Check build logs for errors
2. Verify dependencies in package.json
3. Test build locally: `npm run build`
4. Ensure Node.js version compatibility

### Deployment Timeouts

- Optimize build process
- Remove unnecessary dependencies
- Use build cache effectively

### 404 Errors

- Verify output directory is correct
- Check routing configuration for SPAs
- Ensure index.html exists

## Best Practices

1. **Always test locally first**
   ```bash
   npm run build
   npm run start
   ```

2. **Use environment variables** for configuration
3. **Enable build caching** for faster deployments
4. **Monitor build logs** for warnings
5. **Keep dependencies updated**

## Performance Optimization

- Enable gzip compression
- Use CDN for static assets
- Optimize images before deployment
- Minimize JavaScript bundles
- Use lazy loading for components

## Security

- Never commit secrets to Git
- Use environment variables for sensitive data
- Enable HTTPS (automatic)
- Keep dependencies updated
- Use security headers
