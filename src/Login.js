import React from 'react';
import auth from './auth';

export class Login extends React.Component {
  
  constructor () {
    super ();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: false
    };
  }

  handleSubmit (event) {
    event.preventDefault();
    let { router } = this.context;
    let nextPath = router.getCurrentQuery().nextPath;
    let user = this.refs.user.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;

    auth.login(user, password, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({ error: true });
      }
      if (nextPath) {
        router.replaceWith(nextPath);
      } else {
        router.replaceWith('dashboard');
      }
    });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref='user' placeholder='m0xxxxx'/></label>
        <label><input ref='password' placeholder='password'/></label>
        <button type="submit">login</button>
        {this.state.error && (
          <p>error on login!</p>
        )}
      </form>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.func
};
