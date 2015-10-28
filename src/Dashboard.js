import requireAuth from './requireAuth';
import React from 'react';
import Router from 'react-router';
let { Link, RouteHandler } = Router;
import auth from './auth';
import GeneralNavbar from './GeneralNavbar';
import Settings from './Settings';
import Registration from './Registration';
import Tutors from './Tutors';

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
var Dashboard;
export default Dashboard = requireAuth(class extends React.Component {
  constructor() {
    super();
    this.state = {name: "", email : "", phone: "", classes: [], tutorClasses: []};
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
        this.setState({name: data.name, phone: data.phone, email: data.email, classes: data.classes, tutorClasses: data.tutorClasses});
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

          <div id="everything" className="container-fluid">
            <div className="row" >
              <div id="sidebar" className="col-md-2">
                <div className="sidebar">
                  <ul id="sidebar" className="" >
                    <li className="active"><Link to="tutors" >Tutors</Link></li>
                    <li><Link to="settings" >Settings</Link></li>
                    <li><Link to="register" >Become a Tutor</Link></li>
                  </ul>
                </div>
              </div>

              <div id="content" className="col-md-10">
                <div className="tab-content">
                  <RouteHandler 
                  tutorClasses={this.state.tutorClasses}
                  email={this.state.email}
                  phone={this.state.phone}
                  classes={this.state.classes}/>
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
