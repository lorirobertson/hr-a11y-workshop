import React from 'react';
import { shallow } from 'enzyme';
import {
    a11yHelper,
    reporter,
    buildReports
} from '../../_utilities/test-helpers/attest';

import Login from './Login';

describe('<Login />', () => {
    afterAll((done) => {
        buildReports().then(done);
    });

    it('shows "Please Sign In"', () => {
        const app = shallow(<Login />);
        expect(app.find('h4').text()).toEqual('Please Sign In');
    });

    it('passes automated accessibility tests', (done) => {
        a11yHelper(<Login />).then(results => {
            reporter.logTestResult('Login', results);
            expect(results.violations.length).toBe(0);
        }).then(done);
    })
});