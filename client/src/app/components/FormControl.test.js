import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import 'jsdom-global/register';
import FormControl from './FormControl';
import { a11yHelper, reporter } from '../_utilities/test-helpers/attest';

const elm = <FormControl
                id="formElement"
                name="formElement"
                type="input"
                label="This is a test"
                value="is it the same?"
            />

const wrapper = mount(elm);

describe("<FormControl />", function() {
    afterAll(function(done) {
        reporter
            .buildHTML('./a11y-results')
            .then(done)
            .catch(done);
    });

    it("renders the correct input element.", function(done) {
        expect(wrapper.find('input')).to.have.lengthOf(1);

        a11yHelper(elm)
            .then(results => {
                reporter.logTestResult('Inspect the FormControl component', results);
                expect(results).to.have.property('violations').with.lengthOf(0);
            })
            .then(done)
            .catch(done);
    });

    it("sets the properties correctly.", function() {
        expect(wrapper.find('input').prop('id')).to.equal('formElement');
        expect(wrapper.find('input').prop('name')).to.equal('formElement');
        expect(wrapper.find('input').type()).to.equal('input');
        expect(wrapper.find('input').prop('placeholder')).to.equal('This is a test');
        expect(wrapper.find('input').prop('defaultValue')).to.equal('is it the same?');
    });

    it("responds to value change.", function() {
        wrapper.setProps({ value: 'new value' });
        expect(wrapper.find('input').prop('defaultValue')).to.equal('new value');
    });
});