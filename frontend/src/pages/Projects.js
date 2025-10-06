import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    framework: 'static',
    repository: ''
  });
  const navigate = useNavigate();

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

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await projectService.create(newProject);
      setShowCreateForm(false);
      setNewProject({ name: '', framework: 'static', repository: '' });
      loadProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(id);
        loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Projects</h2>
          <button className="btn" onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? 'Cancel' : '+ New Project'}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreateProject} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Framework</label>
              <select
                value={newProject.framework}
                onChange={(e) => setNewProject({ ...newProject, framework: e.target.value })}
              >
                <option value="static">Static HTML</option>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="next">Next.js</option>
                <option value="nuxt">Nuxt.js</option>
              </select>
            </div>

            <div className="form-group">
              <label>Repository (optional)</label>
              <input
                type="text"
                value={newProject.repository}
                onChange={(e) => setNewProject({ ...newProject, repository: e.target.value })}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <button type="submit" className="btn">Create Project</button>
          </form>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="card">
          <p>No projects yet. Create your first project to get started!</p>
        </div>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <div className="meta">ID: {project.id}</div>
              <div className="meta">Framework: {project.framework}</div>
              <div className="meta">Domain: {project.domain}</div>
              {project.repository && (
                <div className="meta">Repo: {project.repository}</div>
              )}
              <span className={`status ${project.status}`}>{project.status}</span>
              
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button
                  className="btn"
                  onClick={() => navigate(`/deployments/${project.id}`)}
                >
                  View Deployments
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
