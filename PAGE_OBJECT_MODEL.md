# Page Object Model (POM) Implementation

This project implements the Page Object Model design pattern to create maintainable and reusable test automation code. The POM pattern encapsulates page-specific logic and elements, making tests more readable and maintainable.

## Architecture Overview

```
pages/
├── BasePage.js              # Base page object with common functionality
├── LoginPage.js             # Login page specific functionality
├── DashboardPage.js         # Dashboard page specific functionality
└── AddRemoveElementsPage.js # Add/Remove Elements page functionality

tests/
└── pageobject-example.spec.js # Example tests using page objects
```

## Base Page Object

The `BasePage` class provides common functionality that all page objects inherit:

### Key Features:
- **Environment Integration**: Uses environment variables for base URL configuration
- **Common Methods**: Navigation, element selection, screenshots, and waiting utilities
- **Reusable Locators**: Standardized element selection methods

### Example Usage:
```javascript
const BasePage = require('./BasePage');

class MyPage extends BasePage {
  constructor(page) {
    super(page);
    // Page-specific elements and methods
  }
}
```

## Page Object Structure

Each page object follows a consistent structure:

### 1. Constructor
- Extends `BasePage`
- Defines page-specific element locators
- Initializes environment-specific values

### 2. Element Locators
- Encapsulated as methods for better maintainability
- Use descriptive names for clarity
- Support dynamic element selection

### 3. Page Actions
- High-level methods that perform user actions
- Combine multiple steps into single operations
- Handle common scenarios (login, navigation, etc.)

### 4. Verification Methods
- Methods to check page state
- Return boolean values or text content
- Support assertions in tests

## Example Page Objects

### LoginPage
```javascript
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = () => this.page.locator('#username');
    this.passwordInput = () => this.page.locator('#password');
    this.loginButton = () => this.page.getByRole('button', { name: 'Login' });
  }

  async login(username, password) {
    await this.fillLoginForm(username, password);
    await this.submitLogin();
  }
}
```

### DashboardPage
```javascript
class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.logoutButton = () => this.page.getByRole('link', { name: 'Logout' });
  }

  async isLoggedIn() {
    return await this.logoutButton().isVisible();
  }
}
```

## Environment Integration

Page objects seamlessly integrate with the environment configuration system:

### Using Environment Variables
```javascript
// In page object constructor
this.defaultUsername = getEnv('USERNAME', 'tomsmith');
this.defaultPassword = getEnv('PASSWORD', 'SuperSecretPassword!');

// In page object methods
async loginWithEnvCredentials() {
  const username = getRequiredEnv('USERNAME');
  const password = getRequiredEnv('PASSWORD');
  await this.fillLoginForm(username, password);
}
```

### Environment-Specific Behavior
- Different base URLs per environment
- Environment-specific credentials
- Configurable timeouts and settings

## Test Implementation

Tests use page objects to create readable and maintainable test scenarios:

### Test Structure
```javascript
test.describe('Page Object Model Example Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('should login successfully', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login();
    await expect(dashboardPage.logoutButton()).toBeVisible();
  });
});
```

### Benefits in Tests
- **Readability**: Tests read like user stories
- **Maintainability**: Element changes only require page object updates
- **Reusability**: Page objects can be used across multiple test files
- **Environment Flexibility**: Easy switching between environments

## Best Practices

### 1. Element Locators
- Use descriptive names for element locators
- Prefer role-based selectors over CSS/XPath
- Encapsulate complex selectors in methods

### 2. Method Design
- Create high-level methods that perform complete user actions
- Provide both simple and parameterized versions of methods
- Include proper error handling and validation

### 3. Page Object Organization
- Keep page objects focused on single page functionality
- Use inheritance to share common functionality
- Maintain consistent naming conventions

### 4. Environment Integration
- Use environment variables for configuration
- Provide sensible defaults for optional values
- Handle missing environment variables gracefully

## Running Page Object Tests

```bash
# Run all page object tests
npm run test:local tests/pageobject-example.spec.js

# Run specific test group
npm run test:local tests/pageobject-example.spec.js --grep "Login Functionality"

# Run with different environment
npm run test:staging tests/pageobject-example.spec.js
```

## Extending the Framework

### Adding New Page Objects
1. Create a new file in the `pages/` directory
2. Extend `BasePage` class
3. Define page-specific elements and methods
4. Add corresponding tests

### Example: New Page Object
```javascript
// pages/NewFeaturePage.js
const BasePage = require('./BasePage');

class NewFeaturePage extends BasePage {
  constructor(page) {
    super(page);
    this.featureButton = () => this.page.getByRole('button', { name: 'Feature' });
  }

  async performFeatureAction() {
    await this.featureButton().click();
    await this.waitForPageLoad();
  }
}

module.exports = NewFeaturePage;
```

## Troubleshooting

### Common Issues
1. **Element Not Found**: Check if element locators are correct
2. **Timing Issues**: Use appropriate wait methods
3. **Environment Variables**: Verify environment file configuration
4. **Page Object Initialization**: Ensure page objects are created in `beforeEach`

### Debugging Tips
- Use `page.pause()` for interactive debugging
- Add console.log statements in page object methods
- Use Playwright's built-in debugging tools
- Check environment variable loading in console output 