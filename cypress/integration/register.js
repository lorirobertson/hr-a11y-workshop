describe('Register', function () {
    it('Attempt Registration', function () {
        cy.visit('http://localhost:9999/#/register');
        
        cy.injectAxe();
        cy.checkA11y();

        cy.get('a.btn.btn-primary.btn-block')
            .should('have.class', 'disabled');

        cy.get('input#username')
            .type('tester')
            .should('have.value', 'tester');

        cy.get('input#password')
            .type('123@123')
            .should('have.value', '123@123');

        cy.get('input#email')
            .type('test@test.com')
            .should('have.value', 'test@test.com');

        cy.get('input#fullName')
            .type('Tester Testington')
            .should('have.value', 'Tester Testington');

        cy.get('input#dob')
            .type('01/01/2000')
            .should('have.value', '01/01/2000');

        cy.get('a.btn.btn-primary.btn-block')
            .should('not.have.class', 'disabled');

        cy.get('a.btn.btn-primary.btn-block').click();

        cy.url()
            .should('include', '/register/success');
    });
});