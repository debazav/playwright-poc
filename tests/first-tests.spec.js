// @ts-check
const { test, expect } = require('@playwright/test');
test('has text Welcome to the-internet', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');  
    // Expect a title "to contain" a substring.
    await expect(page.getByText('Welcome to the-internet')).toBeVisible();

  });

test('validate if buttons are working correctly', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/'); 
    await page.getByRole('button', {name: 'Add Element'}).click();
    await expect(page.getByRole('button', {name: 'Delete'})).toBeVisible();
    await page.getByRole('button', {name: 'Delete'}).click(); 
    await expect(page.getByRole('button', {name: 'Delete'})).not.toBeVisible();
})

test('click checkboxes', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes'); 
    await page.getByRole('checkbox').first().click();
    await page.locator('input[type=checkbox')
    await expect(page.getByRole('checkbox').first()).toBeChecked();
    await page.getByRole('checkbox').nth(1).click();
    await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked();
})

test('dropdown selection', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown'); 
    await page.locator('#dropdown').selectOption({value: '1'});
})

test('should DELETE a SCOPE with sucess', async ({ page }) => {
    await page.getByRole('link', { name: 'Scope' }).first().click()
    const createdScope = page.getByRole('listitem').filter({ hasText: 'WW/TP' })
    await createdScope.getByRole('button', { name: 'Remove this scope'}).click()          
  });