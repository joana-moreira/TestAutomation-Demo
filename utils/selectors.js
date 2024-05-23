export const selectors = {

  //Platform Main page

  //Not Covered page
  firstName: page.getByLabel('First Name'),
  lastName: page.getByLabel('Last Name'),
  email: page.getByLabel('Email'),
  checkbox: page.getByRole('checkbox'),
  submitButton: page.getByRole('button', { name: 'Submit'}),

  };