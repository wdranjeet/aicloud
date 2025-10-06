import React, { useState, useEffect } from 'react';
import { projectService } from '../services/api';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>
        <p>Welcome to AICloud! Deploy your applications with confidence.</p>
      </div>

      <div className="card">
        <h2>Recent Projects ({projects.length})</h2>
        
        {projects.length === 0 ? (
          <p>No projects yet. Create your first project to get started!</p>
        ) : (
          <div className="project-list">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="project-card">
                <h3>{project.name}</h3>
                <div className="meta">Framework: {project.framework}</div>
                <div className="meta">Domain: {project.domain}</div>
                <span className={`status ${project.status}`}>{project.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn">Create New Project</button>
          <button className="btn btn-secondary">View Documentation</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
