const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.aicloud');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

class Config {
  constructor() {
    this.ensureConfigDir();
  }

  ensureConfigDir() {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
  }

  getConfig() {
    if (!fs.existsSync(CONFIG_FILE)) {
      return {};
    }
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  }

  saveConfig(config) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  }

  getToken() {
    const config = this.getConfig();
    return config.token;
  }

  setToken(token) {
    const config = this.getConfig();
    config.token = token;
    this.saveConfig(config);
  }

  getApiUrl() {
    const config = this.getConfig();
    return config.apiUrl || 'http://localhost:3000';
  }

  setApiUrl(apiUrl) {
    const config = this.getConfig();
    config.apiUrl = apiUrl;
    this.saveConfig(config);
  }

  clear() {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
    }
  }
}

module.exports = new Config();
