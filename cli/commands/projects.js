const axios = require('axios');
const config = require('../utils/config');

async function projects() {
  try {
    const token = config.getToken();
    if (!token) {
      console.log('Please login first using: aicloud login');
      return;
    }

    const response = await axios.get(`${config.getApiUrl()}/api/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const projectsList = response.data.projects;

    if (projectsList.length === 0) {
      console.log('No projects found. Create one using: aicloud init');
      return;
    }

    console.log('\n📁 Your Projects:\n');
    projectsList.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name}`);
      console.log(`   ID: ${project.id}`);
      console.log(`   Domain: ${project.domain}`);
      console.log(`   Framework: ${project.framework}`);
      console.log(`   Status: ${project.status}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error fetching projects:', error.response?.data?.error || error.message);
  }
}

module.exports = projects;
