import React from 'react';
import Layout from './Layout';
import { render } from '@testing-library/react';
import "babel-polyfill"

// Step 1: import the libraries
import * as axeDevTools from '@axe-devtools/browser';
import AxeDevToolsReporter from '@axe-devtools/reporter';

// Step 2: initialize the reporter
const axeReporter = new AxeDevToolsReporter("HRA11Y", "./a11y-results/");

var wrapper = null;
var elm = null;

describe('<Layout />', () => {
    
    beforeEach(async () => {
        // Step 3: initialize the rules engine
        await axeDevTools.init('wcag21');
        
        const { container } = render(<Layout></Layout>);
        
        wrapper = container;
        elm = wrapper.querySelector('#app-container');
    });

    it('passes accessibility checks', async () => {
        // Step 4: run accessibility tests
        const results = await axeDevTools.run(wrapper);
        axeReporter.logTestResult("Layout", results);
        if ( process.env.ASSERT_A11Y )
            expect(results.violations.length).toBe(0);
    });

    it('should contain a sidebar', () => {
        const sidebar = elm.querySelector('aside#sidebar');
        expect(wrapper).toContainElement(sidebar);
    });

    it('should contain a header', () => {
        const header = elm.querySelector('nav#topbar');
        expect(wrapper).toContainElement(header);
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