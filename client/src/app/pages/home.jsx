import React from 'react';
import { Layout } from '../components/layout';
import CookieConsent from 'react-cookie-consent';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Main, Charts } from '../components/Dashboard';
import { TaskList } from '../components/Tasks';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  componentDidMount() {
    document.title = 'Super Demo';
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Layout useTopbar="true" useSidebar="true" className="box-shadow">
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    href="#"
                    onClick={() => { this.toggle('1'); }}
                >
                    Home
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    href="#"
                    onClick={() => { this.toggle('2'); }}
                >
                    Tasks
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1" className="pt-4">
                <Main />
            </TabPane>
            <TabPane tabId="2" className="pt-4">
                <TaskList />
            </TabPane>
        </TabContent>
        <CookieConsent>
            This website uses cookies to enhance the user experience.
        </CookieConsent>
      </Layout>
    )
  }
}

export default Home;