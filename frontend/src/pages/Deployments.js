import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deploymentService } from '../services/api';

function Deployments() {
  const { projectId } = useParams();
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadDeployments();
  }, [projectId]);

  const loadDeployments = async () => {
    try {
      const response = await deploymentService.getByProject(projectId);
      setDeployments(response.data.deployments);
    } catch (error) {
      console.error('Error loading deployments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDeployment = async () => {
    try {
      await deploymentService.create({
        projectId,
        branch: 'main',
        commitMessage: 'Manual deployment from dashboard'
      });
      loadDeployments();
    } catch (error) {
      console.error('Error creating deployment:', error);
    }
  };

  const handleViewLogs = async (deploymentId) => {
    try {
      const response = await deploymentService.getLogs(deploymentId);
      setLogs(response.data.logs);
      setSelectedDeployment(deploymentId);
    } catch (error) {
      console.error('Error loading logs:', error);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Deployments for Project</h2>
          <button className="btn" onClick={handleCreateDeployment}>
            + New Deployment
          </button>
        </div>
      </div>

      {deployments.length === 0 ? (
        <div className="card">
          <p>No deployments yet. Click "New Deployment" to create your first deployment!</p>
        </div>
      ) : (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Branch</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Commit</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Created</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deployments.map((deployment) => (
                <tr key={deployment.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{deployment.id.substring(0, 8)}...</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`status ${deployment.status}`}>
                      {deployment.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{deployment.branch}</td>
                  <td style={{ padding: '12px' }}>{deployment.commitMessage}</td>
                  <td style={{ padding: '12px' }}>
                    {new Date(deployment.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleViewLogs(deployment.id)}
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                    >
                      View Logs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedDeployment && logs.length > 0 && (
        <div className="card">
          <h2>Build Logs</h2>
          <div style={{ 
            background: '#1e1e1e', 
            color: '#d4d4d4', 
            padding: '16px', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                <span style={{ color: '#888' }}>
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>{' '}
                <span style={{ color: log.level === 'error' ? '#f48771' : '#d4d4d4' }}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Deployments;
