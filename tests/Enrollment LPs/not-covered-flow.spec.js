const { test, expect } = require('@playwright/test');

//Config
test.beforeEach(async ({ page }) => {
  await page.goto('https://landing.staging.swordhealth.com/not-covered');
});

//Main test: Enrollment: Not covered flow 
test.describe('Not covered flow', () => {

 //Test 1: Fill in form with valid data
 test('Form with valid data', async ({ page }) => {

    // locate the form section
    await expect(page.waitForSelector('div[id="form-element"]'));
  })
  
})