
const { test, expect } = require('@playwright/test');

//Config
test.beforeEach(async ({ page }) => {
  await page.goto('https://landing.staging.swordhealth.com/');
});

//Main test: Platform Onboarding flow 
test.describe('Onboarding form flow', () => {

  //Test 1: Onboarding redirect 
  test('Eligible client', async ({ page }) => {

    // locate the form section
    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    // locate the input field
    const input =  await page.getByRole('combobox');

    // click on input field
    await input.click()

    // type client name
    await input.fill('accolade')

    // click client name on top down list
    const dropdownList = await page.$('.css-tld14u-menu');

    // locate option
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
   
    // click option
    await client.click();

    // click Get started button
    await page.getByRole('button', { name: 'Get started' }).click();

    // validate redirect 
    await page.waitForURL('https://team-engagement-onboarding.staging.uk.swordhealth.com/c/accolade?client=accolade');
  })


  //Test 2: Not covered redirect 
  test('Not eligible client', async ({ page }) => {

    // locate the form section
    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    // locate the input field
    const input =  await page.getByRole('combobox');

    // click on input field
    await input.click()

    // type client name
    await input.fill('automationtest')

    // click client name on top down list
    const dropdownList = await page.$('.css-tld14u-menu');

    // locate option
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
   
    // click option
    await client.click();

    // click Get started button
    await page.getByRole('button', { name: 'Get started' }).click();

    // validate redirect 
    await page.waitForURL('https://landing.staging.swordhealth.com/not-covered?client=automationtest&program=platform');
  })
})
