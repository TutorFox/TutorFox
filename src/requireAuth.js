import React from 'react';
import auth from './auth';

let requireAuth = (Component) => {
  return class Authenticated extends React.Component {
    static willTransitionTo(transition) {
      if(!auth.loggedIn()) {
        transition.redirect('/login', {}, { 'nextPath' : transition.path });
      }
    }

    render () {
      return <Component {...this.props}/>
    }
  }
}

export default requireAuth
