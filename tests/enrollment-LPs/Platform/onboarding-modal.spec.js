const { test, expect } = require('@playwright/test');
const baseURL = 'https://landing.staging.swordhealth.com/'


//Config
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

//Main test: Platform Onboarding flow 
test.describe('Onboarding form flow', () => {

  //Test 1: Client not displayed in the search
  test('Client with isActive = false', async ({ page }) => {

    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    const input = page.getByRole('combobox');
    await input.click()
    await input.fill('Automation Client 1')

    const dropdownList = await page.$('.css-tld14u-menu');
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
    await client.click();

    await page.getByRole('button', { name: 'Get started' }).click();
    await page.waitForFunction(() => {
      return window.location.href.startsWith('https://landing.staging.swordhealth.com/not-covered');
    });
  }) 

  //Test 2: Client redirected to coming soon page
  test('Client with isActive = true launchDate = future', async ({ page }) => {
    
    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    const input = page.getByRole('combobox');
    await input.click()
    await input.fill('automation-client-2')

    const dropdownList = await page.$('.css-tld14u-menu');
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
    await client.click();

    await page.getByRole('button', { name: 'Get started' }).click();
    await page.waitForFunction(() => {
      return window.location.href.startsWith('https://landing.staging.swordhealth.com/waiting-list');
    });
  }) 

  //Test 3: Client redirected directly to onboarding 
  test('Client with isActive = true and 0 countries', async ({ page }) => {

    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    const input = page.getByRole('combobox');
    await input.click()
    await input.fill('Automation Client 3')

    const dropdownList = await page.$('.css-tld14u-menu');
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
    await client.click();

    await page.getByRole('button', { name: 'Get started' }).click();
    await page.waitForFunction(() => {
      return window.location.href.startsWith('https://team-engagement-onboarding.staging');
    });
  }) 

  //Test 4: Client with more countries
  test('Client with isActive = true and 2 countries', async ({ page }) => {
    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    const input = page.getByRole('combobox');
    await input.click()
    await input.fill('Automa')

    const dropdownList = await page.$('.css-tld14u-menu');
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-1"]');
    await client.click();

    await page.locator('.css-1xc3v61-indicatorContainer').click();

    const country = page.locator('div[id^="react-select-country-option-"]');
    await country.nth(0).click();

    await page.getByRole('button', { name: 'Get started' }).click();
    await page.waitForFunction(() => {
      return window.location.href.startsWith('https://team-engagement-onboarding.staging.eu')
    });
  }) 

  //Test 5: Client with country ≠ from US
  test('Eligible client with Canada country', async ({ page }) => {
  }) 

  //Test 6: Client not displayed in the search
  test('Client with showOnList = false', async ({ page }) => {
  }) 

  //Test 7: Not exiting client 
  test('Not eligible client', async ({ page }) => {

    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    const input =  await page.getByRole('combobox');
    await input.click()
    await input.fill('lorem')

    const dropdownList = await page.$('.css-tld14u-menu');
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
    await client.click();

    await page.getByRole('button', { name: 'Get started' }).click();

    await page.waitForFunction(() => {
      return window.location.href.startsWith('https://landing.staging.swordhealth.com/not-covered');
    });
  })
})
