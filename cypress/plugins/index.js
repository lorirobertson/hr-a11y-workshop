const axeDevToolsPlugin = require('@axe-devtools/cypress/dist/plugin');
const Reporter = require('@axe-devtools/reporter').default;

module.exports = (on, config) => {
  axeDevToolsPlugin(on);

  on('task', {
    // task to create HTML report
    reportAsHTML: async ({resultsDir}) => {
      reporter = new Reporter('ADT_Cypress_HTML', resultsDir);
      await reporter.buildHTML(resultsDir);
      return null;
    },

    // task to create CSV report
    reportAsCSV: async ({resultsDir}) => {
      reporter = new Reporter('ADT_Cypress_CSV', resultsDir);
      await reporter.buildCSV(resultsDir);
      return null;
    },

    // task to create Junit XML report
    reportAsJunit: async ({resultsDir}) => {
      reporter = new Reporter('ADT_Cypress_XML', resultsDir);
      await reporter.buildJUnitXML(resultsDir);
      return null;
    }
  })
}
