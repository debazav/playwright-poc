// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AddRemoveElementsPage = require('../pages/AddRemoveElementsPage');
const { getEnv } = require('../config/env');

test.describe('Page Object Model Example Tests', () => {
  let loginPage;
  let dashboardPage;
  let addRemoveElementsPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    addRemoveElementsPage = new AddRemoveElementsPage(page);
  });

  test.describe('Login Functionality', () => {
    test('should login successfully with environment credentials', async ({ page }) => {
      // Navigate to login page
      await loginPage.navigateToLogin();
      
      // Login using environment variables
      await loginPage.loginWithEnvCredentials();
      
      // Verify successful login
      await expect(dashboardPage.logoutButton()).toBeVisible();
      await expect(dashboardPage.getByText('Welcome to the Secure Area')).toBeVisible();
    });

    test('should login successfully with default credentials', async ({ page }) => {
      // Navigate to login page
      await loginPage.navigateToLogin();
      
      // Login with default credentials
      await loginPage.login();
      
      // Verify successful login
      await expect(dashboardPage.logoutButton()).toBeVisible();
      
      // Get and verify welcome message
      const welcomeMessage = await dashboardPage.getWelcomeMessage();
      expect(welcomeMessage).toContain('Welcome to the Secure Area');
    });

    test('should show error message with invalid credentials', async ({ page }) => {
      // Navigate to login page
      await loginPage.navigateToLogin();
      
      // Login with invalid credentials
      await loginPage.login('invaliduser', 'invalidpass');
      
      // Verify error message
      await expect(loginPage.errorMessage()).toBeVisible();
      
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Your username is invalid');
    });

    test('should logout successfully', async ({ page }) => {
      // First login
      await loginPage.navigateToLogin();
      await loginPage.login();
      
      // Verify logged in
      await expect(dashboardPage.logoutButton()).toBeVisible();
      
      // Logout
      await dashboardPage.logout();
      
      // Verify logged out
      await expect(loginPage.usernameInput()).toBeVisible();
      await expect(loginPage.passwordInput()).toBeVisible();
    });
  });

  test.describe('Add/Remove Elements Functionality', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each test
      await loginPage.navigateToLogin();
      await loginPage.login();
    });

    test('should add and remove elements successfully', async ({ page }) => {
      // Navigate to Add/Remove Elements page
      await dashboardPage.navigateToAddRemoveElements();
      
      // Verify page is loaded
      expect(await addRemoveElementsPage.isPageLoaded()).toBe(true);
      
      // Verify initial state - no delete buttons
      expect(await addRemoveElementsPage.getDeleteButtonCount()).toBe(0);
      
      // Add an element
      await addRemoveElementsPage.addElement();
      
      // Verify delete button is added
      expect(await addRemoveElementsPage.getDeleteButtonCount()).toBe(1);
      expect(await addRemoveElementsPage.hasDeleteButton(0)).toBe(true);
      
      // Remove the element
      await addRemoveElementsPage.removeElement(0);
      
      // Verify delete button is removed
      expect(await addRemoveElementsPage.getDeleteButtonCount()).toBe(0);
      expect(await addRemoveElementsPage.hasDeleteButton(0)).toBe(false);
    });

    test('should add multiple elements and remove them all', async ({ page }) => {
      // Navigate to Add/Remove Elements page
      await dashboardPage.navigateToAddRemoveElements();
      
      // Add multiple elements
      const elementCount = 5;
      await addRemoveElementsPage.addMultipleElements(elementCount);
      
      // Verify all elements are added
      expect(await addRemoveElementsPage.getDeleteButtonCount()).toBe(elementCount);
      
      // Remove all elements
      await addRemoveElementsPage.removeAllElements();
      
      // Verify all elements are removed
      expect(await addRemoveElementsPage.getDeleteButtonCount()).toBe(0);
    });

    test('should handle adding elements in sequence', async ({ page }) => {
      // Navigate to Add/Remove Elements page
      await dashboardPage.navigateToAddRemoveElements();
      
      // Add elements one by one and verify count
      for (let i = 1; i <= 3; i++) {
        await addRemoveElementsPage.addElement();
        expect(await addRemoveElementsPage.getDeleteButtonCount()).toBe(i);
      }
      
      // Remove elements one by one and verify count
      for (let i = 3; i > 0; i--) {
        await addRemoveElementsPage.removeElement(0); // Always remove first element
        expect(await addRemoveElementsPage.getDeleteButtonCount()).toBe(i - 1);
      }
    });
  });

  test.describe('Environment-Specific Tests', () => {
    test('should use environment-specific base URL', async ({ page }) => {
      const baseUrl = getEnv('BASE_URL', 'http://localhost:3000');
      console.log(`Testing against base URL: ${baseUrl}`);
      
      // Navigate using the base URL from environment
      await loginPage.goto('/login');
      
      // Verify we're on the login page
      await expect(loginPage.usernameInput()).toBeVisible();
      await expect(loginPage.passwordInput()).toBeVisible();
    });

    test('should use environment-specific test configuration', async ({ page }) => {
      const timeout = parseInt(getEnv('TIMEOUT', '30000'));
      const headless = getEnv('HEADLESS', 'true') === 'true';
      
      console.log(`Test timeout: ${timeout}ms`);
      console.log(`Headless mode: ${headless}`);
      
      // Set page timeout based on environment variable
      page.setDefaultTimeout(timeout);
      
      // Navigate and perform a simple test
      await loginPage.navigateToLogin();
      await expect(loginPage.usernameInput()).toBeVisible();
    });
  });

  test.describe('Page Object Reusability', () => {
    test('should demonstrate page object reusability', async ({ page }) => {
      // Test 1: Login flow
      await loginPage.navigateToLogin();
      await loginPage.login();
      
      // Test 2: Dashboard navigation
      await dashboardPage.navigateToAddRemoveElements();
      
      // Test 3: Add/Remove elements functionality
      await addRemoveElementsPage.addElement();
      expect(await addRemoveElementsPage.getDeleteButtonCount()).toBe(1);
      
      // Test 4: Navigate back to dashboard
      await page.goBack();
      await expect(dashboardPage.logoutButton()).toBeVisible();
      
      // Test 5: Navigate to another page
      await dashboardPage.navigateToCheckboxes();
      await expect(page.locator('h3')).toContainText('Checkboxes');
    });
  });
}); 