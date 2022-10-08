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


Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', { username: username, password: password } )
    .then(response => {
      localStorage.setItem('loggedUserBlogList', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
})
Cypress.Commands.add('addBlog', (blog) => {
  const token = JSON.parse(localStorage.getItem('loggedUserBlogList')).token
  //In fronend, the token is added by setting axios default header.
  //In cyexpress test, this is done by set the header manually
  const options = {
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    headers: {
      authorization: `bearer ${token}`
    },
    body: blog
  }
  cy.request(options)
})