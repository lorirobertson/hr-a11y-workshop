// import React from 'react';
// import { mount, shallow } from 'enzyme';
// import { expect } from 'chai';

// import BlogPost from './BlogPost';

// const wrapper = shallow(<BlogPost/>);

// describe("<BlogPost />", function() {
//     it("has the correct class name.", function() {
//         expect(wrapper.hasClass('blog-post')).to.equal(true);
//     });
    
//     it("has an image element.", function() {
//         expect(wrapper.find('img')).to.have.length(1);
//     });

//     it("sets the body text.", function() {
//         wrapper.setState({ body: 'Hello World! this is the body text.' });
//         expect(wrapper.find('.post-body').text()).to.equal('Hello World! this is the body text. <Link />');
//     });    

//     it("correctly formats the created date.", function() {
//         wrapper.setState({ created: new Date('1/1/2001') });
//         expect(wrapper.find('.post-date').text()).to.equal('Posted on January 1st, 2001');
//     });
// });