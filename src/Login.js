import React from 'react';
import auth from './auth';
import GeneralNavbar from './GeneralNavbar';

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

  displayLoginModal () {
    $("#logInModal").modal('show');
  }

  render () {
    return (
      <div>
        <GeneralNavbar handleClick={this.displayLoginModal} loggedIn={false}/> 
              <div id="frontCarousel" className="carousel slide" data-ride="carousel">
                      <ol className="carousel-indicators">
                              <li data-target="#frontCarousel" data-slide-to="0" className="active"></li>
                      </ol>
                      <div className="carousel-inner" role="listbox">
                              <div className="item active">
                                      <img className="first-slide" src="foxdrawingcropped.png" alt="Drawing of a Fox"/>
                                      <div className="container">
                                              <div className="carousel-caption">
                                                      <h1>Welcome to Tutor Fox</h1>
                                                      <p>TutorFox is an academic matchmaking site for students and tutors at CETYS Universidad Mexicali Campus.</p>
                                                      <p> If you're faculty or a student, don't worry. <strong>You're already signed up. </strong> </p>
                                                      <p><a className="btn btn-lg btn-primary" role="button" data-toggle="modal" data-target="#logInModal">Log In Now</a></p>
                                              </div>
                                      </div>
                              </div>
                      </div>
              </div>
              <div className="modal fade" id="logInModal" tabIndex="-1" role="dialog" aria-labelledby="logInModalLaber">
                      <div className="modal-dialog modal-sm" role="dialog">
                              <div className="modal-content">
                                      <div className="modal-header">
                                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                              <h4 className="modal-title" id="logInModalLabel">Log In with your ID Number and Blackboard Password</h4>
                                      </div>
                                      <div className="modal-body">
                                              <form onSubmit={this.handleSubmit}>
                                                      <div className="form-group">
                                                              <label htmlFor="loginID">ID Number</label>
                                                              <input ref="user" type="text" className="form-control" id="loginID" placeholder="m0XXXXX" />
                                                      </div>
                                                      <div className="form-group">
                                                              <label htmlFor="loginPassword">Password</label>
                                                              <input ref="password" type="password" className="form-control" id="loginPassword" placeholder="********" />
                                                      </div>
                                              </form>
                                      </div>
                                      <div className="modal-footer">
                                              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                              <button data-dismiss="modal" onClick={this.handleSubmit} type="submit" className="btn btn-primary">Log In</button>
                                      
                                      </div>
                              </div>
                      </div>
              </div>
      </div>
      
      
      

    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.func
};
