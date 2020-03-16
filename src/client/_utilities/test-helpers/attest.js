import a11yHelper from '@deque/attest/a11yHelper';
import AttestReporter from '@deque/attest-reporter';

const reporter = new AttestReporter('demo.dequecloud.com', './a11y-results');

module.exports = {
    a11yHelper: (element) => {
        return new Promise((resolve, reject) => {
            a11yHelper.testEnzymeComponent(element, {}, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    reporter: reporter,

    buildReports: () => {
        let reporterOutputs = [
            reporter.buildHTML('./a11y-results'),
            reporter.buildJUnitXML('./a11y-results'),
        ];

        return Promise.all(reporterOutputs);
    }
};