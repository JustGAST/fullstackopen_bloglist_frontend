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

  it('login form can be accessed', function () {
    cy.contains('Login').click()
    cy.contains('Login to application')
    cy.get('#login-form')
      .get('input[name=username]').should('exist')
      .get('input[name=password]').should('exist')
      .get('button[type=submit]').should('exist')
  })
})