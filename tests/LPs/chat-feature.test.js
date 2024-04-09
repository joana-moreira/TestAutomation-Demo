
const { test, expect } = require('@playwright/test');

//Config
test.beforeEach(async ({ page }) => {
  await page.goto('https://meet.swordhealth.com/');
});

//Main test: Chat feature  
test.describe('Chat feature', () => {

  //Test 1: Confirm element inside chat feature
  test('When user clicks button, element should display', async ({ page }) => {
    
    // User clicks on the Chat button
    await page.getByTestId('launcher').click();

    // 2 seconds wait to open modal
    await page.waitForTimeout(2000);

    // User confirms element is visible on chat form
    await expect(page.getByTestId('button-ok')).toBeVisible();
    })



  //Test 2: Fill in form and send 
  test('User fills in the form', async ({ page }) => {

    const form = page.getByTestId('forms.input');
    
    // User clicks on the Chat button
    await page.getByTestId('launcher').click();

    // 2 seconds wait to open modal
    await page.waitForTimeout(2000);

    // User fill in the form
    await form[0].click().fill('user');
    await form[1].click().fill('user@qa.com');
    await form[2].click().fill('test');

    // User send the form
    await page.getByTestId('button-ok').click();

    // Confirmation step
    await expect(page.getByTestId('buttons.button')).toBeVisible();
  })
})
