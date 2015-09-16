import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute } = Router;
import { App } from './App';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import {HeaderAndFooter} from './HeaderAndFooter';


var routes = (
  <Route handler = {App}>
    <Route name = 'login' handler={Login}/>
    <DefaultRoute name = 'dashboard' handler={Dashboard}/>
  </Route>
)

Router.run( routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('root'));
});
