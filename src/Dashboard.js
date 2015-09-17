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
									<Link to="login"><button onClick={this.handleLogout} type="button" className="btn btn-default navbar-btn navbar-right" href="frontpage.html">
										Log Out
									</button></Link>
								</div>
							</div>
						</nav>
					</div>
				</div>
				
				<h1>Dashboard</h1>
        <Link to ="login" onClick={this.handleLogout}>LOGOUT </Link>
			
      </div>
    );
  }
});


