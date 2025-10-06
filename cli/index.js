#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const loginCommand = require('./commands/login');
const deployCommand = require('./commands/deploy');
const projectsCommand = require('./commands/projects');
const logsCommand = require('./commands/logs');

program
  .name('aicloud')
  .description('AICloud CLI - Deploy and manage your web applications')
  .version(pkg.version);

// Login command
program
  .command('login')
  .description('Authenticate with AICloud')
  .action(loginCommand);

// Deploy command
program
  .command('deploy')
  .description('Deploy your application')
  .option('-p, --project <id>', 'Project ID')
  .option('-b, --branch <name>', 'Branch name', 'main')
  .action(deployCommand);

// Projects command
program
  .command('projects')
  .description('List all your projects')
  .action(projectsCommand);

// Logs command
program
  .command('logs <deploymentId>')
  .description('View deployment logs')
  .action(logsCommand);

// Init command
program
  .command('init')
  .description('Initialize a new project')
  .option('-n, --name <name>', 'Project name')
  .option('-f, --framework <framework>', 'Framework (react, vue, next, static)', 'static')
  .action(async (options) => {
    const inquirer = require('inquirer');
    const axios = require('axios');
    const config = require('./utils/config');
    
    try {
      const token = config.getToken();
      if (!token) {
        console.log('Please login first using: aicloud login');
        return;
      }

      let projectName = options.name;
      if (!projectName) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Project name:',
            validate: (input) => input.length > 0
          }
        ]);
        projectName = answers.name;
      }

      const response = await axios.post(
        `${config.getApiUrl()}/api/projects`,
        {
          name: projectName,
          framework: options.framework
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('\n✅ Project created successfully!');
      console.log(`   ID: ${response.data.project.id}`);
      console.log(`   Domain: ${response.data.project.domain}`);
      console.log('\nRun "aicloud deploy" to deploy your application.');
    } catch (error) {
      console.error('Error creating project:', error.response?.data?.error || error.message);
    }
  });

program.parse();
