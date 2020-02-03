import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Login from './Login'

describe('With Enzyme', () => {
    it('Login shows "Please Sign In"', () => {
        const app = shallow(<Login />);
        expect(app.find('h4').text()).toEqual('Please Sign In');
    });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Hello world!"', () => {
//     const component = renderer.create(<App />)
//     const tree = component.toJSON()
//     expect(tree).toMatchSnapshot()
//   })
// })