import a11yHelper from 'attest/a11yHelper';
import AttestReporter from 'attest-reporter';
//import attestReporter from 'attest-node';

module.exports = {
    a11yHelper: (element) => {
        return new Promise((resolve, reject) => {
            a11yHelper.testEnzymeComponent(element, {}, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    reporter: new AttestReporter('demo.dequecloud.com', './a11y-results')
};