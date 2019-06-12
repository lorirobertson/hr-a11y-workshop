// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require('path');
const AttestReporter = require('attest-reporter').default;

module.exports = (on, config) => {
  on('task', {

    logResults: ({reportName, reportDir, pageName, results}) => {
      return new Promise( resolve => {
        
        let reporter = new AttestReporter(reportName, reportDir);
        let specificName = `${pageName} - ${new Date()}`;
        let outputPath = path.resolve(`${__dirname}`, `../../`, reportDir, `${specificName}`);
        
        reporter.logTestResult(specificName, results);

        reporter.buildHTML(reportDir)
          .then( () => {
            return resolve(`A report is now available: ${outputPath}.html`);
          });
      });
    },

  });
}
