
const { test, expect } = require('@playwright/test');

//Config
test.beforeEach(async ({ page }) => {
  await page.goto('https://meet.swordhealth.com/');
});

//Main test: Chat button  
test('When user clicks button, element should display', async ({ page }) => {
  
  // User clicks on the Chat button
  await page.getByTestId('launcher').click();

  // 2 seconds wait to open modal
  await page.waitForTimeout(2000);

   // User confirms element is visible on chat form
   await expect(page.getByTestId('button-ok')).toBeVisible();
  })
