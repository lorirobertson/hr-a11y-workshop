import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { ProfileHome, ProfileEditor, ChangePassword } from '../components/Profile';

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    document.title = 'Account Profile';
  }

  render() {
    const match = this.props.match;

    return (
      <Layout useTopbar="true" useSidebar="true" className="box-shadow">
        <Route path={`${match.path}`} exact component={ProfileHome}/>
        <Route path={`${match.path}/edit`} component={ProfileEditor}/>
        <Route path={`${match.path}/password`} component={ChangePassword}/>
      </Layout>
    )
  }
}

export default Profile;