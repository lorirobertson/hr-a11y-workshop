import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { BlogHome, BlogPost } from '../components/Blog';

class Blog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    document.title = 'Blog';
  }

  render() {
    const match = this.props.match;
    return (
      <Layout useTopbar="true" useSidebar="true" className="box-shadow">
        <Route path={`${match.path}`} exact component={BlogHome}/>
        <Route path={`${match.path}/post/:id`} exact component={BlogHome}/>
        <Route path={`${match.path}/category/:category`} exact component={BlogHome}/>
      </Layout>
    )
  }
}

export default Blog;