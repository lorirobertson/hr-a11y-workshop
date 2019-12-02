import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import 'jsdom-global/register';
import FormControl from './FormControl';
import { a11yHelper, reporter, buildReports } from '../_utilities/test-helpers/attest';

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
        buildReports().then(done)
    });

    it("renders the correct input element.", function(done) {
        expect(wrapper.find('input')).to.have.lengthOf(1);

        a11yHelper(elm).then(results => {
            reporter.logTestResult('FormControl', results);
            expect(results.violations).to.have.lengthOf(0);
        }).then(done)
        //done();
    });

    it("sets the properties correctly.", function(done) {
        expect(wrapper.find('input').prop('id')).to.equal('formElement');
        expect(wrapper.find('input').prop('name')).to.equal('formElement');
        expect(wrapper.find('input').type()).to.equal('input');
        expect(wrapper.find('input').prop('placeholder')).to.equal('This is a test');
        expect(wrapper.find('input').prop('defaultValue')).to.equal('is it the same?');
        done();
    });

    it("responds to value change.", function(done) {
        wrapper.setProps({ value: 'new value' });
        expect(wrapper.find('input').prop('defaultValue')).to.equal('new value');
        done();
    });
});