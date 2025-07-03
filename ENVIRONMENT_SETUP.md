# Environment Configuration Setup

This project uses environment-specific configuration files to manage different settings for local development, staging, and production environments.

## Environment Files

The project includes several environment configuration files:

- `env.example` - Template showing all available environment variables
- `env.local` - Local development environment settings
- `env.staging` - Staging environment settings  
- `env.production` - Production environment settings

## Available Environment Variables

### Application URLs
- `BASE_URL` - Base URL for the application under test
- `API_URL` - API endpoint URL

### Test Configuration
- `HEADLESS` - Whether to run tests in headless mode (true/false)
- `SLOW_MO` - Slow down Playwright operations by specified milliseconds
- `TIMEOUT` - Default timeout for test operations in milliseconds
- `RETRIES` - Number of retries for failed tests

### Browser Configuration
- `BROWSER` - Default browser to use (chromium, firefox, webkit)
- `VIEWPORT_WIDTH` - Browser viewport width
- `VIEWPORT_HEIGHT` - Browser viewport height

### Authentication
- `USERNAME` - Test user username
- `PASSWORD` - Test user password

### API Configuration
- `API_KEY` - API key for external services

### Database Configuration
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password

## Usage

### Running Tests with Different Environments

```bash
# Run tests with local environment (default)
npm run test:local

# Run tests with staging environment
npm run test:staging

# Run tests with production environment
npm run test:production

# Run tests in headed mode (local environment)
npm run test:headed

# Run tests in debug mode (local environment)
npm run test:debug

# Run tests with UI mode
npm run test:ui
```

### Using Environment Variables in Tests

```javascript
const { getEnv, getRequiredEnv } = require('../config/env');

// Get environment variable with default value
const baseUrl = getEnv('BASE_URL', 'http://localhost:3000');

// Get required environment variable (throws error if not set)
const apiKey = getRequiredEnv('API_KEY');

// Use in tests
await page.goto(baseUrl);
```

### Setting Environment Variables

You can also set environment variables directly when running commands:

```bash
# Set environment variable for a single run (Windows)
set NODE_ENV=staging && npm run test

# Set environment variable for a single run (Unix/Linux/Mac)
NODE_ENV=staging npm run test

# Set custom environment variable (Windows)
set BASE_URL=https://custom.example.com && npm run test

# Set custom environment variable (Unix/Linux/Mac)
BASE_URL=https://custom.example.com npm run test
```

## Configuration Loading

The environment configuration is automatically loaded based on the `NODE_ENV` environment variable:

- If `NODE_ENV` is not set, it defaults to `local`
- The system looks for a file named `env.{NODE_ENV}` (e.g., `env.local`, `env.staging`)
- If the file doesn't exist, a warning is logged but the tests continue

## Security Notes

- Never commit actual `.env` files with sensitive information to version control
- Use `env.example` as a template and create your own environment files
- Consider using CI/CD secrets for production environment variables
- The `env.example` file is safe to commit as it contains no real credentials

## Customization

To add new environment variables:

1. Add the variable to `env.example` with a descriptive comment
2. Add appropriate values to each environment file (`env.local`, `env.staging`, `env.production`)
3. Use the variable in your tests with `getEnv()` or `getRequiredEnv()`

## Troubleshooting

- If environment variables are not loading, check that the `NODE_ENV` is set correctly
- Verify that the environment file exists and has the correct format
- Check the console output for any warnings about missing environment files
- Ensure the `dotenv` package is installed (`npm install dotenv`)
- For Windows compatibility, ensure `cross-env` is installed (`npm install --save-dev cross-env`) 