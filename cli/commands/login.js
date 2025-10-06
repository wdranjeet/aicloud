const inquirer = require('inquirer');
const axios = require('axios');
const config = require('../utils/config');

async function login() {
  try {
    console.log('Welcome to AICloud! Please login to continue.\n');

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        validate: (input) => input.includes('@')
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        mask: '*'
      }
    ]);

    const apiUrl = config.getApiUrl();
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      email: answers.email,
      password: answers.password
    });

    config.setToken(response.data.token);
    console.log('\n✅ Login successful!');
    console.log(`   Welcome, ${response.data.user.name}!`);
  } catch (error) {
    if (error.response?.status === 400) {
      console.error('\n❌ Invalid credentials. Please try again.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n❌ Cannot connect to AICloud API. Please ensure the server is running.');
    } else {
      console.error('\n❌ Login failed:', error.response?.data?.error || error.message);
    }
  }
}

module.exports = login;
