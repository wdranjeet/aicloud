const express = require('express');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// In-memory storage (replace with database in production)
const projects = [];

// Get all projects for authenticated user
router.get('/', authMiddleware, (req, res) => {
  const userProjects = projects.filter(p => p.userId === req.user.id);
  res.json({ projects: userProjects });
});

// Get single project
router.get('/:id', authMiddleware, (req, res) => {
  const project = projects.find(p => p.id === req.params.id && p.userId === req.user.id);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json({ project });
});

// Create new project
router.post('/', authMiddleware, (req, res) => {
  const { name, repository, framework } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Project name is required' });
  }

  const project = {
    id: uuidv4(),
    name,
    repository: repository || '',
    framework: framework || 'static',
    userId: req.user.id,
    domain: `${name.toLowerCase().replace(/\s+/g, '-')}.aicloud.app`,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active'
  };

  projects.push(project);
  res.status(201).json({ message: 'Project created successfully', project });
});

// Update project
router.put('/:id', authMiddleware, (req, res) => {
  const projectIndex = projects.findIndex(p => p.id === req.params.id && p.userId === req.user.id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const { name, repository, framework } = req.body;
  
  projects[projectIndex] = {
    ...projects[projectIndex],
    name: name || projects[projectIndex].name,
    repository: repository || projects[projectIndex].repository,
    framework: framework || projects[projectIndex].framework,
    updatedAt: new Date()
  };

  res.json({ message: 'Project updated successfully', project: projects[projectIndex] });
});

// Delete project
router.delete('/:id', authMiddleware, (req, res) => {
  const projectIndex = projects.findIndex(p => p.id === req.params.id && p.userId === req.user.id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  projects.splice(projectIndex, 1);
  res.json({ message: 'Project deleted successfully' });
});

module.exports = router;
