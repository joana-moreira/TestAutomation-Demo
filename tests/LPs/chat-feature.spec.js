
const { test, expect } = require('@playwright/test');

//Config
test.beforeEach(async ({ page }) => {
  await page.goto('https://meet.swordhealth.com/');
});

//Main test: Chat feature  
test.describe('Chat feature', () => {

  //Test 1: Confirm element inside chat feature
  test('When user clicks button, element should display', async ({ page }) => {
    // locate the entire chat button frame
    const chatButtonFrame = await page.frameLocator('#launcher');

    // User clicks on the Chat button
    await chatButtonFrame.getByTestId('launcher').click();

    // Chat is in a different frame than the button
    // Locate the chat frame
    const chatFrame =  await page.frameLocator('#webWidget');

    // User confirms element is visible on chat form
    await expect(chatFrame.getByTestId('button-ok')).toBeVisible();
  })

  //Test 2: Fill in form and send 
  test('User fills in the form', async ({ page }) => {
    // locate the entire chat button frame
    const chatButtonFrame = await page.frameLocator('#launcher');

    // User clicks on the Chat button
    await chatButtonFrame.getByTestId('launcher').click();

    // Chat is in a different frame than the button
    // Locate the chat frame
    const chatFrame =  await page.frameLocator('#webWidget');

    // Locate each form field by their name. It's a stable way to locate them and fill in the form
    await chatFrame.locator('[name="name"]').fill( 'user');
    await chatFrame.locator('[name="email"]').fill('user@test.com');
    await chatFrame.locator('[name="message"]').fill('test message');

    // User send the form
    await chatFrame.getByTestId('button-ok').click();

    // Locate the chat footer
    // This might need a condition if the chat is not during open hours causing this test to fail
    await expect(chatFrame.getByTestId('chat-footer-desktop')).toBeVisible();
  })
})
