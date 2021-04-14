import React from 'react';
import Avatar from './Avatar';
import { render } from '@testing-library/react';
import "babel-polyfill"

// Step 1: import the libraries
import * as axeDevTools from '@axe-devtools/browser';
import AxeDevToolsReporter from '@axe-devtools/reporter';

// Step 2: initialize the reporter
const axeReporter = new AxeDevToolsReporter("HRA11Y", "./a11y-results/");

var wrapper = null;
var elm = null;

describe('<Avitar />', () => {
    
    beforeEach(async () => {
        // Step 3: initialize the rules engine
        await axeDevTools.init('wcag21');
        
        const { container } = render(
            <Avatar
                src="https://s.gravatar.com/avatar/a907e0ca029d67e236ad3b40b48d8164?s=80"
                alt="my image"
            />
        );
        
        wrapper = container;
        elm = wrapper.querySelector('img');
    });

    it('passes accessibility checks', async () => {
        // Step 4: run accessibility tests
        const results = await axeDevTools.run(wrapper);
        axeReporter.logTestResult("Avitar", results);
        if ( process.env.ASSERT_A11Y )
            expect(results.violations.length).toBe(0);
    });

    it('renders the component with an image element', () => {
        expect(wrapper).toContainElement(elm);
    });

    it('has the provided attributes', () => {
        expect(elm).toHaveAttribute('src', 'https://s.gravatar.com/avatar/a907e0ca029d67e236ad3b40b48d8164?s=80');
        expect(elm).toHaveAttribute('alt', 'my image');
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