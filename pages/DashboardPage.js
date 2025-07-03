const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Page elements
    this.logoutButton = () => this.page.getByRole('link', { name: 'Logout' });
    this.welcomeMessage = () => this.page.locator('.subheader');
    this.addRemoveElementsLink = () => this.page.getByRole('link', { name: 'Add/Remove Elements' });
    this.checkboxesLink = () => this.page.getByRole('link', { name: 'Checkboxes' });
    this.dropdownLink = () => this.page.getByRole('link', { name: 'Dropdown' });
    this.flashMessage = () => this.page.locator('#flash');
  }

  /**
   * Check if user is logged in by looking for logout button
   * @returns {Promise<boolean>} True if logout button is visible
   */
  async isLoggedIn() {
    return await this.logoutButton().isVisible();
  }

  /**
   * Logout user
   */
  async logout() {
    await this.logoutButton().click();
    await this.waitForPageLoad();
  }

  /**
   * Get welcome message text
   * @returns {Promise<string>} Welcome message
   */
  async getWelcomeMessage() {
    await this.waitForElement(this.welcomeMessage());
    return await this.welcomeMessage().textContent();
  }

  /**
   * Navigate to Add/Remove Elements page
   */
  async navigateToAddRemoveElements() {
    await this.addRemoveElementsLink().click();
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Checkboxes page
   */
  async navigateToCheckboxes() {
    await this.checkboxesLink().click();
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Dropdown page
   */
  async navigateToDropdown() {
    await this.dropdownLink().click();
    await this.waitForPageLoad();
  }

  /**
   * Get flash message text
   * @returns {Promise<string>} Flash message
   */
  async getFlashMessage() {
    await this.waitForElement(this.flashMessage());
    return await this.flashMessage().textContent();
  }

  /**
   * Check if flash message is visible
   * @returns {Promise<boolean>} True if flash message is visible
   */
  async hasFlashMessage() {
    return await this.flashMessage().isVisible();
  }
}

module.exports = DashboardPage; 