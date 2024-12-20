describe('Session details spec', () => {

  beforeEach(() => {
    cy.visit('/login')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  });


  it('Delete session', () => {

    // cy.visit('api/sessions/detail/3')

    // cy.intercept('GET', '/api/sessions/detail/3', {
    //   body: {
    //     id: 1,
    //     name: "Test session",
    //     description: "This is a test session for the e2e tests",
    //     date: new Date(),
    //     teacher_id: 1,
    //     users: [1, 2],
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   }
    // });

    // cy.intercept('DELETE', '/api/sessions/detail/3', {
    //   statusCode: 200,
    // }).as('delete')


    // // cy.get('[data-testid="attendees-count"]').should('contain', '2 attendees');


    // cy.get('button').contains('Delete').click()

    // cy.url().should('include', '/sessions')

    cy.url().should('include', '/sessions')

    cy.get('[data-testid="detail-button"]').click();

    cy.get('button[color="warn"]').click();

    cy.url().should('include', '/sessions')

  });
});
