/// <reference types="Cypress" />

import { func } from 'prop-types'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    const user = {
      username : 'TestUser',
      name: 'TestName',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
    cy
  })

  it('Login form is shown', function() {
    cy.contains(/login/i)
    cy.contains(/username/i)
    cy.contains(/password/i)
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('WrongUser')
    cy.get('#password').type('Wrongpassword')
    cy.get('#login-submit').click()
    cy.get('.error')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

  })
  it('succeeds with correct credentials', function() {
    cy.get('#username').type('TestUser')
    cy.get('#password').type('password')
    cy.get('#login-submit').click()
    cy.contains('Logged in with TestUser')
  })
  describe.only('After logged in', function(){
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/test/reset')
      const user = {
        username : 'TestUser',
        name: 'TestName',
        password: 'password'
      }
      const blog = {
        title : 'Test Title',
        author: 'Test Author',
        url: 'http://...'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.login(user.username, user.password)
        .then(function(){
          cy.addBlog(blog)
        })

    })

    it('The users can like a blog', function(){
      cy.contains('logged in')
    })
  })

})
