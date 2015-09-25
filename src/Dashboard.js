import requireAuth from './requireAuth';
import React from 'react';
import Router from 'react-router';
let { Link } = Router;
import auth from './auth';
import GeneralNavbar from './GeneralNavbar';

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
  constructor() {
    super();
    this.state = {name: "", email : ""};
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout () {
    auth.logout();
  }

  componentDidMount(){
    $.ajax({
      url: '/users/'+localStorage.user+'/settings',
      type: 'GET',
      success: function (data) {
        this.setState({name: data.name, email: data.email});
      }.bind(this)
    })
  }
  render () {
    return (
    <div>
      <div className="row">
        <GeneralNavbar loggedIn={true} name={this.state.name} handleClick={this.handleLogout} />
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
											<input type="email" className="form-control" id="emailSet" value={this.state.email}/>
										</div>
										<div className="form-group">
											<label for="telSet">Telephone</label>
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
Dashboard.contextTypes = {
  router: React.PropTypes.func
};
