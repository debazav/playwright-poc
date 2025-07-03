const BasePage = require('./BasePage');

class AddRemoveElementsPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Page elements
    this.addElementButton = () => this.page.getByRole('button', { name: 'Add Element' });
    this.deleteButtons = () => this.page.getByRole('button', { name: 'Delete' });
    this.pageTitle = () => this.page.locator('h3');
  }

  /**
   * Navigate to Add/Remove Elements page
   */
  async navigateToPage() {
    await this.goto('/add_remove_elements/');
    await this.waitForPageLoad();
  }

  /**
   * Add a new element
   */
  async addElement() {
    await this.addElementButton().click();
  }

  /**
   * Remove element by index
   * @param {number} index - Index of the delete button (0-based)
   */
  async removeElement(index = 0) {
    const deleteButtons = this.deleteButtons();
    const count = await deleteButtons.count();
    
    if (index >= count) {
      throw new Error(`Delete button at index ${index} not found. Total buttons: ${count}`);
    }
    
    await deleteButtons.nth(index).click();
  }

  /**
   * Remove all elements
   */
  async removeAllElements() {
    const deleteButtons = this.deleteButtons();
    const count = await deleteButtons.count();
    
    for (let i = count - 1; i >= 0; i--) {
      await deleteButtons.nth(i).click();
    }
  }

  /**
   * Get the number of delete buttons
   * @returns {Promise<number>} Number of delete buttons
   */
  async getDeleteButtonCount() {
    return await this.deleteButtons().count();
  }

  /**
   * Check if delete button exists at specific index
   * @param {number} index - Index to check
   * @returns {Promise<boolean>} True if delete button exists
   */
  async hasDeleteButton(index = 0) {
    const count = await this.getDeleteButtonCount();
    return index < count;
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getPageTitle() {
    await this.waitForElement(this.pageTitle());
    return await this.pageTitle().textContent();
  }

  /**
   * Add multiple elements
   * @param {number} count - Number of elements to add
   */
  async addMultipleElements(count) {
    for (let i = 0; i < count; i++) {
      await this.addElement();
    }
  }

  /**
   * Verify the page is loaded correctly
   * @returns {Promise<boolean>} True if page is loaded
   */
  async isPageLoaded() {
    try {
      await this.waitForElement(this.addElementButton());
      await this.waitForElement(this.pageTitle());
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = AddRemoveElementsPage; 