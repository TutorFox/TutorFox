import React from 'react';
import Router from 'react-router';
let {Link} = Router;


export default class GeneralNavbar extends React.Component {
  render() {
    var namepad = {
      paddingRight: '21px'
    }
    const name = (<p className="navbar-text navbar-right" style={namepad}><u><small>Logged in as: {this.props.name}</small></u></p>);

    return (
      <div className="navbar-wrapper">
        <div className="container">
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#"><img src="tutorfoxsideways.png" id="brand"/></a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Home</a></li>
                </ul>
                <Link to={this.props.loggedIn?'login':'/'}>
                  <button type="button" onClick={this.props.handleClick} className="btn btn-default navbar-btn navbar-right" >
                    {this.props.loggedIn?'Log out':' Log in'}
                  </button> 
                </Link>
                {this.props.loggedIn?name:''}
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
