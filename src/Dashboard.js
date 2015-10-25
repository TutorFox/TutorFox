import requireAuth from './requireAuth';
import React from 'react';
import Router from 'react-router';
let { Link } = Router;
import auth from './auth';
import GeneralNavbar from './GeneralNavbar';
import Settings from './Settings';
import Registration from './Registration';

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
    this.state = {name: "", email : "", classes: [], tutorClasses: []};
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout () {
    auth.logout();
  }

  componentDidMount(){
    $.ajax({
      url: '/users/'+localStorage.user,
      type: 'GET',
      success: function (data) {
        this.setState({name: data.name, email: data.email, classes: data.classes, tutorClasses: data.tutorClasses});
      }.bind(this)
    })
  }
  render () {
    const classes = this.state.classes.map(course => {
      return (<li>{course.name} {course.grade}</li>);
    });
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
                  <Settings email={this.state.email}/>
                  <Registration  tutorClasses={this.state.tutorClasses} classes={this.state.classes}/>  
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
