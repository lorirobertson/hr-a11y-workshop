describe('Login', function () {

    before( function () {
        cy.visit('http://localhost:9999/');
        cy.injectAttest();
    });

    it('Should load the correct URL', function () {
        cy.url().should('eq', 'http://localhost:9999/#/login');
        cy.checkA11y({
            reportName: 'Login',
            scopeName: 'Entire Page'
        });
    });
    
    it('Has a valid login form.', function () {
        cy.get('form').within(() => {
            cy.get('input#email').should('be.visible');

            cy.get('input#password').should('be.visible');

            cy.get('button').should('be.visible');
        });
    });

    it('Should display an error message after login failure.', function () {
        cy.get('input#email').type('fail@test.com');

        cy.get('input#password').type('swordfish');

        cy.get('button').click();

        // wait for the server to respond, then test for the error
        cy.wait(1000)
            .get('div.alert')
            .should('be.visible');
    });

    it('Should redirect to the dashboard after login success.', function () {
        cy.get('input#email')
            .clear()
            .type('tester')
            .should('have.value', 'tester');

        cy.get('input#password')
            .clear()
            .type('123@123')
            .should('have.value', '123@123');

        cy.get('button').click();

        cy.wait(1000)
            .url().should('eq', 'http://localhost:9999/#/');
    });

});