import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { TableList, TimesheetEditor } from '../components/Timesheets';

class Timesheets extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    document.title = 'Timesheets';
  }

  render() {
    const match = this.props.match;

    return (
      <Layout useTopbar="true" useSidebar="true" className="box-shadow">
        <Route path={`${match.path}`} exact component={TableList}/>
        <Route path={`${match.path}/new`} exact component={TimesheetEditor}/>
        <Route path={`${match.path}/:id/edit`} component={TimesheetEditor}/>
        <Route path={`${match.path}/week/:date/new`} exact component={TimesheetEditor}/>
        <Route path={`${match.path}/week/:date`} exact component={TableList}/>
      </Layout>
    )
  }
}

export default Timesheets;