import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreator from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onFetchLocalStorage();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' component={BurgerBuilder} />

      </Switch>
    )
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/logout' component={Logout} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>)
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onFetchLocalStorage: () => dispatch(actionCreator.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
