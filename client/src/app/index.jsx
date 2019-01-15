import React, { Component, Fragment } from 'react';
import { HashRouter, BrowserRouter, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { Home, Timesheets, StuffShop, Blog, Auth, Error, Profile } from './pages';

import '../assets/css/fontawesome-all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../assets/less/main.less';


const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path='/login' component={Auth} />
          <Route path='/register' component={Auth} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute path='/timesheets' component={Timesheets} />
          <PrivateRoute path='/stuff-shop' component={StuffShop} />
          <PrivateRoute path='/blog' component={Blog} />
          <PrivateRoute path='/account' component={Profile} />
          {/* <Route path='*' component={Error} /> */}
        </Fragment>
      </Router>
    )
  }
}

export default App