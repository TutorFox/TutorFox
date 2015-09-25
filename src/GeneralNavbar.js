import React from 'react';
import Router from 'react-router';
let {Link} = Router;

var namepad = {
	paddingRight: '10px'
}

export default class GeneralNavbar extends React.Component {
  render() {
    const name = (<p className="navbar-text navbar-right" style={namepad}><u><small>Logged in as: {this.props.name}</small></u></p>);

    return (
      <div className="navbar-wrapper">
        <div className="container">
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">TutorFox</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                </ul>
                <Link to={this.props.loggedIn?'login':'/'}>
                  <button type="button" onClick={this.props.handleClick} className="btn btn-default navbar-btn navbar-right" >
                    {this.props.loggedIn?'Log out':' Log in'}
                  </button> 
                </Link>
                {this.props.loggedIn?name:''};
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
