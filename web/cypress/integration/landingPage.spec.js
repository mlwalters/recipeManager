describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should contain logo', () => {
    cy.get('[data-cy="logo"]').should('exist');
  });

  it('should not display the menu', () => {
    cy.get('[data-cy="menu"]').should('not.exist');
  });

  it('should contain landing page details', () => {
    cy.get('[data-cy="landing-text"]').should('contain', 'Big Bite Recipe Manager');
    cy.get('[data-cy="hero-img"]').should('exist');
    cy.get('[data-cy="login-btn"]').should('exist');
  });

  it('should display the footer details', () => {
    cy.scrollTo(0, 250);
    cy.get('[data-cy="app-creator"]').should('have.text', 'Made with ❤️: Maricar Lusuegro Walters');
    cy.get('[data-cy="credits"]').contains('Illustrations are from canva.com and freepik.com');
  });
});
