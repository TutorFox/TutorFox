import React from 'react';
export class NavbarFrontPage extends React.Component {

	render(){
		return(
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
								<button type="button" className="btn btn-default navbar-btn navbar-right" data-toggle="modal" data-target="#logInModal">
									Log In
								</button>
							</div>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}

