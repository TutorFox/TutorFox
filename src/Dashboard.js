import requireAuth from './requireAuth';
import React from 'react';
import Router from 'react-router';
let { Link } = Router;
import auth from './auth';

export var Dashboard = requireAuth(class extends React.Component {
  handleLogout () {
    auth.logout();
  }
  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to ="login" onClick={this.handleLogout}>LOGOUT </Link>
      </div>
    );
  }
});


