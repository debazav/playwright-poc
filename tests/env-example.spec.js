// @ts-check
const { test, expect } = require('@playwright/test');
const { getEnv, getRequiredEnv } = require('../config/env');

test.describe('Environment Variables Example', () => {
  test('should use environment-specific base URL', async ({ page }) => {
    // Get the base URL from environment variables
    const baseUrl = getEnv('BASE_URL', 'http://localhost:3000');
    const apiUrl = getEnv('API_URL', 'http://localhost:8000');
    
    console.log(`Testing against base URL: ${baseUrl}`);
    console.log(`API URL: ${apiUrl}`);
    
    // Navigate to the base URL
    await page.goto(baseUrl);
    
    // You can also use the baseURL configured in playwright.config.js
    // await page.goto('/'); // This will use the baseURL from config
  });

  test('should use environment-specific credentials', async ({ page }) => {
    // Get credentials from environment variables
    const username = getEnv('USERNAME', 'defaultuser');
    const password = getEnv('PASSWORD', 'defaultpass');
    
    console.log(`Using username: ${username}`);
    
    // Example login flow using environment variables
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Fill in credentials from environment variables
    await page.fill('#username', username);
    await page.fill('#password', password);
    
    // Note: This is just an example - the actual login form might be different
    // await page.click('button[type="submit"]');
  });

  test('should handle required environment variables', async ({ page }) => {
    try {
      // This will throw an error if API_KEY is not set
      const apiKey = getRequiredEnv('API_KEY');
      console.log(`API Key is set: ${apiKey.substring(0, 4)}...`);
    } catch (error) {
      console.log('API_KEY is not set, skipping API tests');
    }
  });

  test('should use environment-specific test configuration', async ({ page }) => {
    // Get test configuration from environment variables
    const timeout = parseInt(getEnv('TIMEOUT', '30000'));
    const headless = getEnv('HEADLESS', 'true') === 'true';
    
    console.log(`Test timeout: ${timeout}ms`);
    console.log(`Headless mode: ${headless}`);
    
    // Set page timeout based on environment variable
    page.setDefaultTimeout(timeout);
    
    // Navigate to a test page
    await page.goto('https://the-internet.herokuapp.com/');
    
    // Verify the page loaded
    await expect(page).toHaveTitle(/The Internet/);
  });
}); 