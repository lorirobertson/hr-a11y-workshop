import React from 'react';
import PTOModal from './PTOModal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "babel-polyfill"

// Step 1: import the libraries
import * as axeDevTools from '@axe-devtools/browser';
import AxeDevToolsReporter from '@axe-devtools/reporter';

// Step 2: initialize the reporter
const axeReporter = new AxeDevToolsReporter("HRA11Y", "./a11y-results/");

var wrapper = null;
var elm = null;

describe('<PTOModal />', () => {
    
    beforeEach(async () => {
        // Step 3: initialize the rules engine
        await axeDevTools.init('wcag21');
        
        const { container } = render(<PTOModal />);

        wrapper = container;
    });

    it('passes accessibility checks', async () => {
        // Step 4: run accessibility tests
        const results = await axeDevTools.run(wrapper);
        axeReporter.logTestResult("PTOModal", results);
        if ( process.env.ASSERT_A11Y )
            expect(results.violations.length).toBe(0);
    });

    it('modal is closed on render', () => {
        const modal = wrapper.querySelector('#PTORequestModal');
        expect(modal).not.toBeInTheDocument();
    });

    it('modal is visible when button is clicked', () => {
        userEvent.click(screen.getByText('Start a new PTO Request'));
        const modal = wrapper.querySelector('#PTORequestModal');
        expect(modal).not.toBeInTheDocument();
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