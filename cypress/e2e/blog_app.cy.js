describe('Blog app', () => {
  beforeEach(function() {
    const baseUrl = 'http://localhost:3000'
    cy.request('POST', `${baseUrl}/api/testing/reset`)
    cy.request('POST', `${baseUrl}/api/users/`, {
      username: 'test_user',
      name: 'Test User',
      password: '123456'
    })
    cy.visit(baseUrl)
  })

  it('front page can be opened', () => {
    cy.contains('Blogs')
  })

  it('login form is shown', function () {
    cy.contains('Login').click()
    cy.contains('Login to application')
    cy.get('#login-form')
      .get('input[name=username]').should('exist')
      .get('input[name=password]').should('exist')
      .get('button[type=submit]').should('exist')
  })

  describe('Login', function() {
    it ('successful with valid credentials', function() {
      cy.contains('Login').click()
      cy.get('input[name=username]').type('test_user')
      cy.get('input[name=password]').type('123456')
      cy.get('button[type=submit]').click()

      cy.contains('Test User logged in')
      cy.contains('Log out')
    })

    it ('unsuccessful with invalid credentials', function() {
      cy.contains('Login').click()

      cy.get('input[name=username]').type('wrong_user')
      cy.get('input[name=password]').type('654321')
      cy.get('button[type=submit]').click()

      cy.contains('incorrect username or password')
      cy.get('.notification.danger')
        .should('exist')
        .and('have.css', 'background-color', 'rgb(255, 200, 200)')
        .and('have.css', 'color', 'rgb(139, 0, 0)')
        .and('have.css', 'border-color', 'rgb(139, 0, 0)')
    })
  })
})