// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const baseUrl = 'http://localhost:3000';

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', `${baseUrl}/api/login`, {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('loggedBlogsAppUser', JSON.stringify(response.body));
    cy.visit(baseUrl);
  });
});

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('loggedBlogsAppUser');
  cy.visit(baseUrl);
});

Cypress.Commands.add('createBlog', (title, author, url) => {
  const token = JSON.parse(localStorage.getItem('loggedBlogsAppUser')).token;
  cy.request({
    method: 'POST',
    url: `${baseUrl}/api/blogs`,
    body: {
      title,
      author,
      url,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  cy.visit(baseUrl);
});
