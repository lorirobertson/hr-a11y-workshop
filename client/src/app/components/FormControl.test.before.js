import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import 'jsdom-global/register';
import FormControl from './FormControl';

const elm = <FormControl
                id="formElement"
                name="formElement"
                type="input"
                label="This is a test"
                value="is it the same?"
            />

const wrapper = mount(elm);

describe("<FormControl />", function() {
    it("renders the correct input element.", function() {
        expect(wrapper.find('input')).to.have.lengthOf(1);
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