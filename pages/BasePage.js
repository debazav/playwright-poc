const { getEnv } = require('../config/env');

class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = getEnv('BASE_URL', 'http://localhost:3000');
  }

  /**
   * Navigate to a specific path relative to the base URL
   * @param {string} path - The path to navigate to
   */
  async goto(path = '') {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    await this.page.goto(url);
  }

  /**
   * Wait for page to be loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get element by text
   * @param {string} text - Text to search for
   * @returns {import('@playwright/test').Locator} Playwright locator
   */
  getByText(text) {
    return this.page.getByText(text);
  }

  /**
   * Get element by role
   * @param {string} role - ARIA role
   * @param {Object} options - Additional options
   * @returns {import('@playwright/test').Locator} Playwright locator
   */
  getByRole(role, options = {}) {
    return this.page.getByRole(role, options);
  }

  /**
   * Get element by test ID
   * @param {string} testId - Test ID attribute value
   * @returns {import('@playwright/test').Locator} Playwright locator
   */
  getByTestId(testId) {
    return this.page.getByTestId(testId);
  }

  /**
   * Take a screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Wait for element to be visible
   * @param {import('@playwright/test').Locator} locator - Element locator
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(locator, timeout = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
  }
}

module.exports = BasePage; 