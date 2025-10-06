const axios = require('axios');
const config = require('../utils/config');

async function logs(deploymentId) {
  try {
    const token = config.getToken();
    if (!token) {
      console.log('Please login first using: aicloud login');
      return;
    }

    const response = await axios.get(
      `${config.getApiUrl()}/api/deployments/${deploymentId}/logs`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log('\n📋 Deployment Logs:\n');
    
    if (response.data.logs.length === 0) {
      console.log('No logs available yet.');
      return;
    }

    response.data.logs.forEach(log => {
      const timestamp = new Date(log.timestamp).toLocaleTimeString();
      const level = log.level || 'info';
      const prefix = level === 'error' ? '❌' : '📝';
      console.log(`[${timestamp}] ${prefix} ${log.message}`);
    });
    console.log('');
  } catch (error) {
    console.error('Error fetching logs:', error.response?.data?.error || error.message);
  }
}

module.exports = logs;
