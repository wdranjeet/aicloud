const axios = require('axios');
const config = require('../utils/config');
const fs = require('fs');
const path = require('path');

async function deploy(options) {
  try {
    const token = config.getToken();
    if (!token) {
      console.log('Please login first using: aicloud login');
      return;
    }

    let projectId = options.project;

    // If no project ID, try to read from config
    if (!projectId) {
      const configPath = path.join(process.cwd(), 'aicloud.json');
      if (fs.existsSync(configPath)) {
        const projectConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        projectId = projectConfig.projectId;
      }
    }

    if (!projectId) {
      console.log('Please specify a project ID using --project or run "aicloud init" first');
      return;
    }

    console.log('🚀 Starting deployment...\n');

    const response = await axios.post(
      `${config.getApiUrl()}/api/deployments`,
      {
        projectId,
        branch: options.branch || 'main',
        commitMessage: 'Manual deployment via CLI'
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log('✅ Deployment initiated!');
    console.log(`   Deployment ID: ${response.data.deployment.id}`);
    console.log(`   Status: ${response.data.deployment.status}`);
    console.log(`   URL: ${response.data.deployment.url}`);
    console.log(`\nView logs: aicloud logs ${response.data.deployment.id}`);
  } catch (error) {
    console.error('❌ Deployment failed:', error.response?.data?.error || error.message);
  }
}

module.exports = deploy;
