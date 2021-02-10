import React from 'react';
import FormControl from './FormControl';
import { render } from '@testing-library/react';
import "babel-polyfill"

// Step 1: import the libraries
import * as axeDevTools from '@axe-devtools/browser';
import AxeDevToolsReporter from '@axe-devtools/reporter';

// Step 2: initialize the reporter
const axeReporter = new AxeDevToolsReporter("HRA11Y", "./a11y-results/");

var wrapper = null;
var inputElm = null;

describe('<FormControl />', () => {
    
    beforeEach(async () => {
        // Step 3: initialize the rules engine
        await axeDevTools.init('wcag21');
        
        const { container } = render(
            <FormControl
                id="my-form-element"
                name="formElement"
                type="input"
                label=""
                value="is it the same?"
            />
        );

        wrapper = container;
        inputElm = wrapper.querySelector('#my-form-element');
    });

    it('passes accessibility checks', async () => {
        // Step 4: run accessibility tests
        const results = await axeDevTools.run(wrapper);
        axeReporter.logTestResult("FormControl", results);
        if ( process.env.ASSERT_A11Y )
            expect(results.violations.length).toBe(0);
    });

    it('renders the component with an input element', () => {
        expect(wrapper).toContainElement(inputElm);
    });

    it('has the provided attributes', () => {
        expect(inputElm).toHaveAttribute('type', 'input');
        expect(inputElm).toHaveAttribute('name', 'formElement');
        expect(inputElm).toHaveValue('is it the same?');
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