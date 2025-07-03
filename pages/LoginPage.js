const BasePage = require('./BasePage');
const { getEnv, getRequiredEnv } = require('../config/env');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Page elements
    this.usernameInput = () => this.page.locator('#username');
    this.passwordInput = () => this.page.locator('#password');
    this.loginButton = () => this.page.getByRole('button', { name: 'Login' });
    this.errorMessage = () => this.page.locator('#flash.error');
    this.successMessage = () => this.page.locator('#flash.success');
    
    // Default credentials from environment
    this.defaultUsername = getEnv('USERNAME', 'tomsmith');
    this.defaultPassword = getEnv('PASSWORD', 'SuperSecretPassword!');
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.goto('/login');
    await this.waitForPageLoad();
  }

  /**
   * Fill login form with provided credentials
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async fillLoginForm(username = this.defaultUsername, password = this.defaultPassword) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
  }

  /**
   * Fill login form with environment credentials
   */
  async fillLoginFormWithEnvCredentials() {
    const username = getRequiredEnv('USERNAME');
    const password = getRequiredEnv('PASSWORD');
    await this.fillLoginForm(username, password);
  }

  /**
   * Submit login form
   */
  async submitLogin() {
    await this.loginButton().click();
    await this.waitForPageLoad();
  }

  /**
   * Complete login process
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username = this.defaultUsername, password = this.defaultPassword) {
    await this.fillLoginForm(username, password);
    await this.submitLogin();
  }

  /**
   * Login with environment credentials
   */
  async loginWithEnvCredentials() {
    await this.fillLoginFormWithEnvCredentials();
    await this.submitLogin();
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message
   */
  async getErrorMessage() {
    await this.waitForElement(this.errorMessage());
    return await this.errorMessage().textContent();
  }

  /**
   * Get success message text
   * @returns {Promise<string>} Success message
   */
  async getSuccessMessage() {
    await this.waitForElement(this.successMessage());
    return await this.successMessage().textContent();
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error message is visible
   */
  async hasErrorMessage() {
    return await this.errorMessage().isVisible();
  }

  /**
   * Check if success message is visible
   * @returns {Promise<boolean>} True if success message is visible
   */
  async hasSuccessMessage() {
    return await this.successMessage().isVisible();
  }
}

module.exports = LoginPage; 