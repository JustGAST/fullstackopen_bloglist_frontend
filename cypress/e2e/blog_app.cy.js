describe('Blog app', () => {
  const baseUrl = 'http://localhost:3000';
  beforeEach(function () {
    cy.request('POST', `${baseUrl}/api/testing/reset`);
    cy.request('POST', `${baseUrl}/api/users/`, {
      username: 'test_user',
      name: 'Test User',
      password: '123456',
    });
    cy.request('POST', `${baseUrl}/api/users/`, {
      username: 'test_user2',
      name: 'Test User2',
      password: '123456',
    });
    cy.visit(baseUrl);
  });

  it('front page can be opened', () => {
    cy.contains('Blogs');
  });

  it('login form is shown', function () {
    cy.contains('Login').click();
    cy.contains('Login to application');
    cy.get('#login-form')
      .get('input[name=username]')
      .should('exist')
      .get('input[name=password]')
      .should('exist')
      .get('button[type=submit]')
      .should('exist');
  });

  describe('Login', function () {
    it('successful with valid credentials', function () {
      cy.contains('Login').click();
      cy.get('input[name=username]').type('test_user');
      cy.get('input[name=password]').type('123456');
      cy.get('button[type=submit]').click();

      cy.contains('Test User logged in');
      cy.contains('Log out');
    });

    it('unsuccessful with invalid credentials', function () {
      cy.contains('Login').click();

      cy.get('input[name=username]').type('wrong_user');
      cy.get('input[name=password]').type('654321');
      cy.get('button[type=submit]').click();

      cy.contains('incorrect username or password');
      cy.get('.notification.danger')
        .should('exist')
        .and('have.css', 'background-color', 'rgb(255, 200, 200)')
        .and('have.css', 'color', 'rgb(139, 0, 0)')
        .and('have.css', 'border-color', 'rgb(139, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login('test_user', '123456');
    });

    it('a blog can be created', function () {
      cy.contains('Create new').click();
      cy.get('input[name=title]').type('Test title');
      cy.get('input[name=author]').type('Test Author');
      cy.get('input[name=url]').type('https://test.com');
      cy.get('button[type=submit]').click();

      cy.get('.notification.success').should('exist');
      cy.contains('A new blog Test title by Test Author was added');

      cy.get('.blog-item')
        .contains('Test title by Test Author')
        .contains('View');
    });

    it('a blog can be liked', function () {
      cy.createBlog('Test title', 'Test Author', 'https://test.com');

      cy.get('.blog-item').as('blogItem');
      cy.get('@blogItem').contains('View').click();
      cy.get('@blogItem').contains('Like').click();
      cy.get('@blogItem').contains('Likes: 1');
      cy.get('@blogItem').contains('Like').click();
      cy.get('@blogItem').contains('Likes: 2');
    });

    it('a blog can be removed', function () {
      cy.createBlog('Blog to remove', 'Test Author', 'https://remove.com');

      cy.contains('Blog to remove by Test Author').parent().as('blogItem');
      cy.get('@blogItem').contains('View').click();
      cy.get('@blogItem').contains('Remove').click();
      cy.get('html').should('not.contain', 'Blog to remove by Test Author');
      cy.get('.notification.success').should(
        'contain',
        'Blog "Blog to remove" by Test Author was successfully removed'
      );
    });

    it("a blog can't be removed by another user", function () {
      cy.createBlog('Blog to stay', 'Test Author', 'https://stay.com');
      cy.logout();
      cy.login('test_user2', '123456');

      cy.contains('Blog to stay by Test Author').parent().as('blogItem');
      cy.get('@blogItem').contains('View').click();
      cy.get('@blogItem').should('not.contain', 'Remove');
    });

    it('sorts blogs by likes', function () {
      cy.createBlog('Blog one', 'Author one', 'https://one.com');
      cy.createBlog('Blog two', 'Author two', 'https://two.com');
      cy.createBlog('Blog three', 'Author three', 'https://three.com');
      cy.createBlog('Blog four', 'Author four', 'https://four.com');

      cy.contains('Blog one by Author one').as('blogItem');
      cy.get('@blogItem').should('contain', 'Blog one');

      cy.get('@blogItem').contains('View').click();
      cy.get('@blogItem').contains('Like').click();
      cy.get('@blogItem').contains('Likes: 1');
      cy.get('@blogItem').contains('Like').click();
      cy.get('@blogItem').contains('Likes: 2');

      cy.get('.blog-item')
        .eq(3)
        .should('contain', 'Blog one')
        .and('contain', 'Likes: 2');
    });
  });
});
