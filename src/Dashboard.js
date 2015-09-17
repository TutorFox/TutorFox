import requireAuth from './requireAuth';
import React from 'react';
import Router from 'react-router';
let { Link } = Router;
import auth from './auth';

var rowstyle = {
	paddingTop: '30px'
}

var sidebar = {
	position: 'fixed',
	top: '70px',
	width: '228px'
}

var mainstyle = {
	paddingLeft: '50px',
	paddingTop: '30px'
}

export var Dashboard = requireAuth(class extends React.Component {
  handleLogout () {
    auth.logout();
  }
  render () {
    return (
			<div>
				<div className="row">
					<nav className="navbar navbar-inverse navbar-fixed-top">
						<div className="container-fluid">
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

				<div className="container-fluid">
					<div className="row" style={rowstyle}>
						<div className="col-sm-3 col-md-2 sidebar">
							<ul id="sidebar" className="nav nav-pills nav-stacked" style={sidebar}>
								<li className="active"><a data-toggle="pill" href="#tutors">Tutors</a></li>
								<li><a data-toggle="pill" href="#settings">Settings</a></li>
								<li><a data-toggle="pill" href="#register">Become a Tutor</a></li>
							</ul>
						</div>
						<div className=" col-md-9 main" style={mainstyle}>
							<div className="tab-content">
								<div id="tutors" className="tab-pane fade in active">
									<h3>Search for your Tutor</h3>
									<p>Hello, there. I'm not ready <i>yet.</i></p>
								</div>
								<div id="settings" className="tab-pane fade">
									<h3>Settings</h3>
									<form>
										<div className="form-group">
											<label for="emailSet">E-Mail</label>
											<input type="email" className="form-control" id="emailSet" placeholder="user@example.domain"/>
										</div>
										<div className="form-group">
											<label for="telSet">Password</label>
											<input type="tel" className="form-control" id="telSet" placeholder="XXX-XXX-XXXX"/>
										</div>
										<button type="button" className="btn btn-primary">Confirm</button>
										<button type="button" className="btn btn-default">Cancel</button>
									</form>
								</div>	
								<div id="register" className="tab-pane fade">

								</div>
							</div>
						</div>
					</div>
				</div>
			
      </div>
    );
  }
});


