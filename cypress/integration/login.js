describe('Login', function () {

    before( function () {
        cy.visit('http://localhost:9999/');

        cy.window({ log: false })
            .then(window => {
                const attest = require('attest');
                attest.init();
            });
    });

    it('Should load the correct URL', async function () {
        let a11y = await attest.run(document);

        cy.task('logResults', {
            reportName: 'localhost',
            reportDir: './cy-a11y-results',
            pageName: 'Login',
            results: a11y
        });

        expect(a11y.violations).to.have.length(0);

        cy.url().should('eq', 'http://localhost:9999/#/login');
    });
    
    it('Has a valid login form.', async function () {
        cy.get('form').within(() => {
            cy.get('input#email').should('be.visible');

            cy.get('input#password').should('be.visible');

            cy.get('button').should('be.visible');
        });
    });

    it('Should display an error message after login failure.', async function () {
        cy.get('input#email').type('fail@test.com');

        cy.get('input#password').type('swordfish');

        cy.get('button').click();

        // wait for the server to respond, then test for the error
        cy.wait(1000)
            .get('div.alert')
            .should('be.visible');
    });

    it('Should redirect to the dashboard after login success.', async function () {
        cy.get('input#email')
            .clear()
            .type('test@test.com')
            .should('have.value', 'test@test.com');

        cy.get('input#password')
            .clear()
            .type('123@123')
            .should('have.value', '123@123');

        cy.get('button').click();

        cy.wait(1000)
            .url().should('eq', 'http://localhost:9999/#/');
    });

});