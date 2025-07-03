const path = require('path');
const fs = require('fs');

/**
 * Load environment variables based on the current environment
 * @param {string} env - Environment name (local, staging, production)
 */
function loadEnvConfig(env = 'local') {
  const envFile = path.join(process.cwd(), `env.${env}`);
  
  if (fs.existsSync(envFile)) {
    require('dotenv').config({ path: envFile });
    console.log(`Loaded environment configuration from: ${envFile}`);
  } else {
    console.warn(`Environment file not found: ${envFile}`);
  }
}

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable key
 * @param {any} defaultValue - Default value if not found
 * @returns {string|any} Environment variable value or default
 */
function getEnv(key, defaultValue = null) {
  return process.env[key] || defaultValue;
}

/**
 * Get required environment variable
 * @param {string} key - Environment variable key
 * @returns {string} Environment variable value
 * @throws {Error} If environment variable is not set
 */
function getRequiredEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

module.exports = {
  loadEnvConfig,
  getEnv,
  getRequiredEnv
}; 