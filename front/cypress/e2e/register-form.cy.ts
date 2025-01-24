describe('Register unsuccessfull', () => {

  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `user${randomString}@test.fr`;
  }

  it('Register unsuccessful for too short first name', () => {
    cy.visit('/register')
    const mail = generateRandomEmail();

      cy.get('input[formControlName=firstName]').type("T")
      cy.get('input[formControlName=lastName]').type("User")
      cy.get('input[formControlName=email]').type(`${mail}`)
      cy.get('input[formControlName=password]').type("password123!")

      cy.get('button[type="submit"]').click();

      cy.get('[data-testid="error"]').should('be.visible')
  });

  it('Register unsuccessful for too short last name', () => {
    cy.visit('/register')
    const mail = generateRandomEmail();

      cy.get('input[formControlName=firstName]').type("Test")
      cy.get('input[formControlName=lastName]').type("U")
      cy.get('input[formControlName=email]').type(`${mail}`)
      cy.get('input[formControlName=password]').type("password123!")

      cy.get('button[type="submit"]').click();

      cy.get('[data-testid="error"]').should('be.visible')
  });

  it('Register unsuccessful for incorrect mail', () => {
    cy.visit('/register')
    const mail = generateRandomEmail();

      cy.get('input[formControlName=firstName]').type("Test")
      cy.get('input[formControlName=lastName]').type("User")
      cy.get('input[formControlName=email]').type(`a@a.a`)
      cy.get('input[formControlName=password]').type("password123!")

      cy.get('button[type="submit"]').click();

      cy.get('[data-testid="error"]').should('be.visible')
  });

  it('Register unsuccessful for incorrect password', () => {
    cy.visit('/register')
    const mail = generateRandomEmail();

      cy.get('input[formControlName=firstName]').type("T")
      cy.get('input[formControlName=lastName]').type("User")
      cy.get('input[formControlName=email]').type(`${mail}`)
      cy.get('input[formControlName=password]').type("p")

      cy.get('button[type="submit"]').click();

      cy.get('[data-testid="error"]').should('be.visible')
  });

  it('Register disabled because of incorrect email format', () => {
    cy.visit('/register')
    const mail = generateRandomEmail();

      cy.get('input[formControlName=firstName]').type("T")
      cy.get('input[formControlName=lastName]').type("User")
      cy.get('input[formControlName=email]').type('a')
      cy.get('input[formControlName=password]').type("password123!")

      cy.get('button[type="submit"]').should('be.disabled');
  });
});
