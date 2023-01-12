describe('Blog app', () => {
  const baseUrl = 'http://localhost:3000'
  beforeEach(function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('test_user', '123456')
    })

    it('a blog can be created', function() {
      cy.contains('Create new').click()
      cy.get('input[name=title]').type('Test title')
      cy.get('input[name=author]').type('Test Author')
      cy.get('input[name=url]').type('https://test.com')
      cy.get('button[type=submit]').click()

      cy.get('.notification.success').should('exist')
      cy.contains('A new blog Test title by Test Author was added')

      cy.get('.blog-item').contains('Test title by Test Author').contains('View')
    })

    it('a blog can be liked', function() {
      cy.createBlog('Test title', 'Test Author', 'https://test.com')

      cy.get('.blog-item').as('blogItem')
      cy.get('@blogItem').contains('View').click()
      cy.get('@blogItem').contains('Like').click()
      cy.get('@blogItem').contains('Likes: 1')
      cy.get('@blogItem').contains('Like').click()
      cy.get('@blogItem').contains('Likes: 2')
    })
  })
})