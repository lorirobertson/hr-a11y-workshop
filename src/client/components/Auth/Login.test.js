import React from 'react';
import Login from './Login';
import { render } from '@testing-library/react';
import "babel-polyfill"

// Step 1: import the libraries
import * as axeDevTools from '@axe-devtools/browser';
import AxeDevToolsReporter from '@axe-devtools/reporter';

// Step 2: initialize the reporter
const axeReporter = new AxeDevToolsReporter("HRA11Y", "./a11y-results/");

var wrapper = null;
var elm = null;

describe('<Login />', () => {
    
    beforeEach(async () => {
        // Step 3: initialize the rules engine
        await axeDevTools.init('wcag21');
        
        const { container } = render(<Login />);
        
        wrapper = container;
        elm = wrapper.querySelector('form');
    });

    it('passes accessibility checks', async () => {
        // Step 4: run accessibility tests
        const results = await axeDevTools.run(wrapper);
        axeReporter.logTestResult("Login", results);
        if ( process.env.ASSERT_A11y )
            expect(results.violations.length).toBe(0);
    });

    it('contains credential fields', () => {
        expect(elm.querySelectorAll('input').length).toBe(2);
    });

    it('Submit button should be disabled if credentials are empty ', () => {
        const btn = elm.querySelector('button');
        expect(wrapper).toContainElement(btn);
        expect(btn).toBeDisabled();
    });

    afterAll(async () => {
        // Step 5: build the reports
        await Promise.all([
            axeReporter.buildHTML('./a11y-results/'),
            axeReporter.buildJUnitXML('./a11y-results/'),
            axeReporter.buildCSV('./a11y-results/'),
        ]);
    });    
});