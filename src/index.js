import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute } = Router;
import { App } from './App';
import { Login } from './Login';
import Dashboard from './Dashboard';
import {HeaderAndFooter} from './HeaderAndFooter';
import Settings from './Settings';
import Tutors from './Tutors';
import Registration from './Registration';


var routes = (
  <Route handler = {App}>
    <Route name = 'login' handler={Login}/>
    <Route name = 'dashboard' path='/' handler={Dashboard}>
      <Route name ='settings' path='settings' handler={Settings}/>
      <DefaultRoute name ='tutors' path='tutors' handler={Tutors}/>
      <Route name = 'register' path='register' handler={Registration}/>
    </Route>
  </Route>
)

Router.run( routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('root'));
});
