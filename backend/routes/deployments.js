const express = require('express');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/auth');
const deploymentService = require('../services/deployment');
const router = express.Router();

// In-memory storage (replace with database in production)
const deployments = [];

// Get all deployments for a project
router.get('/project/:projectId', authMiddleware, (req, res) => {
  const projectDeployments = deployments.filter(d => d.projectId === req.params.projectId);
  res.json({ deployments: projectDeployments });
});

// Get single deployment
router.get('/:id', authMiddleware, (req, res) => {
  const deployment = deployments.find(d => d.id === req.params.id);
  
  if (!deployment) {
    return res.status(404).json({ error: 'Deployment not found' });
  }

  res.json({ deployment });
});

// Create new deployment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { projectId, branch, commitSha, commitMessage } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const deployment = {
      id: uuidv4(),
      projectId,
      branch: branch || 'main',
      commitSha: commitSha || 'manual',
      commitMessage: commitMessage || 'Manual deployment',
      status: 'pending',
      url: `https://${projectId}-${Date.now()}.aicloud.app`,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: req.user.id,
      buildLogs: []
    };

    deployments.push(deployment);

    // Start deployment process asynchronously
    deploymentService.deploy(deployment).catch(err => {
      console.error('Deployment error:', err);
      deployment.status = 'failed';
      deployment.error = err.message;
    });

    res.status(201).json({ 
      message: 'Deployment initiated', 
      deployment 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get deployment logs
router.get('/:id/logs', authMiddleware, (req, res) => {
  const deployment = deployments.find(d => d.id === req.params.id);
  
  if (!deployment) {
    return res.status(404).json({ error: 'Deployment not found' });
  }

  res.json({ logs: deployment.buildLogs || [] });
});

// Cancel deployment
router.post('/:id/cancel', authMiddleware, (req, res) => {
  const deployment = deployments.find(d => d.id === req.params.id);
  
  if (!deployment) {
    return res.status(404).json({ error: 'Deployment not found' });
  }

  if (deployment.status === 'completed' || deployment.status === 'failed') {
    return res.status(400).json({ error: 'Cannot cancel completed or failed deployment' });
  }

  deployment.status = 'cancelled';
  deployment.updatedAt = new Date();

  res.json({ message: 'Deployment cancelled', deployment });
});

module.exports = router;
