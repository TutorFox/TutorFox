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
    <link href="frontpage.css" type="text/css" rel="stylesheet"/>
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
        <div className="container marketing">
          <hr className="featurette-divider"/>
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">Find <u>your</u> ideal tutor.</h2>
              <p className="lead">TutorFox is designed to help you find a tutor that suits your needs inside the CETYS environment. TutorFox provides you with all sorts of info on your prospective tutor from their grades on the class they are teaching to the price they are asking for their services.</p>
            </div>
          </div>
          <hr className="featurette-divider"/>
          <div className="row featurette">
            <div className="col-md-7 col-md-push-5">
              <h2 className="featurette-heading">Request and Forget Model</h2>
              <p className="lead">When you request for a tutor's help a notification is sent to this tutor with your information, all you need to do is sit back and wait for a reply through your e-mail or phone.</p>
            </div>
          </div>
          <hr className="featurette-divider"/>
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">Ready to Step Up?</h2>
              <p className="lead">
                TutorFox depends on its community to form a strong academic relationship between students at CETYS. If you feel capable, become a tutor. It's quick, easy, and lets students know about your desire to help. <span className="text-muted">You can get some money out of it as well.</span>
              </p>
            </div>
          </div>
          <hr className="featurette-divider"/>
          
          <footer>
            <p className="pull-right"><a href="#">Back to Top</a></p>
            <p>&copy; 2015 TutorFox</p>
          </footer>
        </div>

    </div>

      
      
      

    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.func
};
