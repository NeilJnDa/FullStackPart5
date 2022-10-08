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
      const blog1 = {
        title : 'Title1',
        author: 'Author1',
        url: 'http://...'
      }
      const blog2 = {
        title : 'Title2',
        author: 'Author2',
        url: 'http://...'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.login(user.username, user.password)
        .then(function(){
          cy.addBlog(blog1)
          cy.addBlog(blog2)
        })
      cy.visit('http://localhost:3000')
    })

    it('The users can like a blog', function(){
      cy.get('button:contains("View")').first().click()
      cy.get('#LikesNumber').then($num => {
        const num0 = parseInt($num.text())
        console.log('Original likes:', (num0).toString())

        cy.get('button:contains("Like")').first().click().then(() => {
          console.log('Expected likes:', (num0+1).toString())
          cy.get('#LikesNumber').should('have.text', (num0+1).toString())
        })
      })
      // cy.get('#LikesNumber').then(function(num){
      //   console.log(num)
      //   cy.get('button:contains("Like")').first().click().then(function(){
      //     cy.get('#LikesNumber')
      //   })
      // })
    })
    it('A blog can be created', function() {
      cy.get('button:contains("Create New")')
        .click()
        .then(function(){
          cy.get('input[placeholder="Blog Title"]').type('New Title')
          cy.get('input[placeholder="Name"]').type('New Author')
          cy.get('input[placeholder="http://...."]').type('New Url')
        })
        .then(function(){
          cy.get('button[type="submit"]').click()
        })
      cy.contains('New blog created: ')
    })
    it.only('A blog can be deleted', function() {
      cy.get('button:contains("View")').first().click()
      cy.get('button:contains("Remove")').first().as('removeButton')

      cy.get('@removeButton').click().wait(1000).then(function(){
        cy.contains('Title1').should('not.exist')
      })
    })
  })
})
