/*  To validate how and if we should implement this
import { selectors } from '../utils/selectors';*/

const {test, expect} = require('@playwright/test');
const baseURL = 'https://landing.staging.swordhealth.com/'

async function navigateToURL(page, path) {
  const fullURL = `${baseURL}${path}`;
  await page.goto(fullURL);
  return fullURL;
}

//Config
test.beforeEach(async ({page}) => {
  await page.goto(baseURL);
});

//Main test: Enrollment: Not covered flow 
test.describe('Not covered flow', () => {

  //Test 1: Check correct flow and submission of the form
  test('Form with valid data', async ({page}) => {

    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    const input = page.getByRole('combobox');
    await input.click()
    await input.fill('lorem')

    const dropdownList = await page.$('.css-tld14u-menu');
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
    await client.click();

    await page.getByRole('button', { name: 'Get started' }).click();
    await page.waitForURL('https://landing.staging.swordhealth.com/not-covered?client=lorem&program=platform');

    await page.getByLabel('First Name').fill('Jonh');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Email').fill('johndoe@test.com');
    expect(page.getByLabel('Enter your employer or plan')).toHaveValue("lorem");

    await page.locator('.css-1l8uzyq-container').click();
    await page.locator(('div[id^="react-select-product-option-"]')).nth(2).click();

    await page.locator(('.radio-label-wrapper')).nth(1).click();

    await page.getByRole('checkbox').check();

    await page.getByRole('button', {name: 'Submit'}).click();

    expect(page.getByRole('button', {name: 'Homepage'})).toBeVisible();
  })

  //Test 2: Check correct flow and error messages display
  test('Form with invalid data', async ({ page }) => {

    await expect(page.getByTestId('onboarding-form')).toBeVisible();

    const input = page.getByRole('combobox');
    await input.click()
    await input.fill('lorem')

    const dropdownList = await page.$('.css-tld14u-menu');
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
    await client.click();

    await page.getByRole('button', { name: 'Get started' }).click();

    /* To discuss if this is a better aproach to check parameters

    const path = 'not-covered'
    const queryParams = new URLSearchParams({
      client: 'lorem',
      program: 'platform'
    });
    const fullURL = `${baseURL}${path}?${queryParams.toString()}`;

    await page.waitForURL(fullURL);
    const currentURL = page.url ();
    const url = new URL(currentURL);

    expect(url.searchParams.get('client')).toBe('lorem');
    expect(url.searchParams.get('program')).toBe('platform');*/

    await page.waitForURL('https://landing.staging.swordhealth.com/not-covered?client=lorem&program=platform');

    await page.getByLabel('First Name').fill('');
    await page.getByLabel('Last Name').fill('');
    await page.getByLabel('Email').fill('johndoetest.com');
    expect (page.getByRole('checkbox')).not.toBeChecked();

    await page.getByRole('button', { name: 'Submit'}).click();

    const errorMessages = page.locator('.error-label');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBe(4);
  })

  //Test 3: Check redirect with correct parameters  
  test('Pre-filled program and plan fields', async ({ page }) => {
 
    const path = 'bloom';
    const fullURL = await navigateToURL(page, path);
    const currentURL = page.url();
    expect(currentURL).toBe(fullURL);

    await (page.getByTestId('enroll-modal')).nth(0).click();
    await (page.waitForSelector('span[id="react-select-companies-live-region"]'));

    const input = page.getByRole('combobox');
    await input.click()
    await input.fill('lorem')
    
    const dropdownList = await page.$('.css-tld14u-menu');
    const client = await dropdownList.waitForSelector('div[id="react-select-companies-option-0"]');
    await client.click();

    const modal = await page.getByTestId('onboarding-form');
    await modal.getByRole('button', { name: 'Get started' }).click();
    
    await page.waitForURL('https://landing.staging.swordhealth.com/not-covered?client=lorem&program=bloom');

    expect(page.getByLabel('Enter your employer or plan')).toHaveValue("lorem");

    expect(page.locator('.css-1l8uzyq-container')).toHaveText("Bloom");
  })
})
