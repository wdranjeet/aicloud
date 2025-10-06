const request = require('supertest');

// Create a new app instance for testing
const express = require('express');
const cors = require('cors');
const authRoutes = require('../backend/routes/auth');
const projectRoutes = require('../backend/routes/projects');
const deploymentRoutes = require('../backend/routes/deployments');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/deployments', deploymentRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AICloud API is running' });
});

describe('API Health Check', () => {
  it('should return OK status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});

describe('Authentication API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'testpassword123',
        name: 'Test User'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should login existing user', async () => {
    // First register
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'login@example.com',
        password: 'testpassword123'
      });

    // Then login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'testpassword123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
