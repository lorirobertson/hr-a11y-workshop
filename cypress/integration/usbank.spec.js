describe('US Bank', () => {
  it('Test homepage for a11y', () => {
    // First, we visit the page we intend to analyze
    cy.visit('https://www.usbank.com/index.html');

    // Then we call on Axe to scan that page for a11y violations
    cy.axeAnalyze();
    cy.screenshot();

    cy.getAxeResults().then(results => {
      // create a directory where results will be stored
      const resultsDir = './cypress/a11y-results/';

      // write the results to a JSON file in the specified directory
      cy.writeFile(`${resultsDir}/usbank/home.json`, results)

      // create HTML reports based on those results
      cy.task('reportAsHTML', { resultsDir })

      // create CSV reports based on those results
      cy.task('reportAsCSV', { resultsDir })

      // create XML reports based on those results
      cy.task('reportAsJunit', { resultsDir })
    });
  })

  it('Test mortgage rates page for a11y', () => {
    // First, we visit the page we intend to analyze
    cy.visit('https://www.usbank.com/home-loans/mortgage.html');

    // Then we call on Axe to scan that page for a11y violations
    cy.axeAnalyze();
    cy.screenshot();

    cy.getAxeResults().then(results => {
      // create a directory where results will be stored
      const resultsDir = './cypress/a11y-results/';

      // write the results to a JSON file in the specified directory
      cy.writeFile(`${resultsDir}/usbank/mortgage-rates.json`, results)

      // create HTML reports based on those results
      cy.task('reportAsHTML', { resultsDir })

      // create CSV reports based on those results
      cy.task('reportAsCSV', { resultsDir })

      // create XML reports based on those results
      cy.task('reportAsJunit', { resultsDir })
    });
  })
})
