import requireAuth from './requireAuth';
import React from 'react';
import Router from 'react-router';
let { Link } = Router;
import auth from './auth';
import GeneralNavbar from './GeneralNavbar';
import Settings from './Settings';
import Registration from './Registration';
import Tutors from './Tutors';
import Requests from './Requests';

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
    this.state = {name: "", email : "", phone: "", price: "", about: "", showGrades: true, classes: [],tutorClasses: [], requests: []};
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
        this.setState({name: data.name, about: data.aboutMe, price: data.price, showGrades: data.showGrades, phone: data.phone, email: data.email, classes: data.classes, tutorClasses: data.tutorClasses, requests: data.requests});
      }.bind(this)
    })
    setInterval(this.checkUpdates.bind(this), 5000);
  }

  checkUpdates() {
    $.ajax({
      url: '/users/'+localStorage.user,
      type: 'GET',
      success: function (data) {
        this.setState({requests: data.requests});
      }.bind(this)
    })

  }

  deleteRequest(i) {
    let requests = this.state.requests.slice();
    requests.splice(i,1)
    $.ajax({
      url: 'request/all/' + localStorage.user  ,
      type: 'POST',
      data: {requests: requests},
      dataType: 'json',
      success: function(requests) {
        this.setState({requests: requests});
      }.bind(this)
    })
  }

  markAsSeen() {
    let requests = this.state.requests.slice();
    for (let request of requests ) {
      request.seen = 'true';
    }
    if(requests.length > 0)
    $.ajax({
      url: 'request/all/' + localStorage.user  ,
      type: 'POST',
      data: {requests: requests},
      dataType: 'json',
      success: function(requests) {
        this.setState({requests: requests});
      }.bind(this)
    })
  }
  render () {
    const classes = this.state.classes.map(course => {
      return (<li>{course.name} {course.grade}</li>);
    });

    let unseenCount = this.state.requests.filter(req => { return req.seen === 'false' }).length;
    const requests = this.state.tutorClasses.length !== 0 ? <li><a onClick = {this.markAsSeen.bind(this)} data-toggle="pill" href="#requests">Requests{unseenCount > 0? <span className="badge">{unseenCount}</span> : null}</a></li> : null;
    return (
        <div>
          <link href="home.css" type="text/css" rel="stylesheet"/>
          <div className="row">
            <GeneralNavbar loggedIn={true} name={this.state.name} handleClick={this.handleLogout} />
          </div>

          <div id="everything" className="container-fluid">
            <div className="row" >
              <div id="sidebar" className="col-md-2">
                <div className="sidebar">
                  <ul id="sidebar" className="nav nav-pills nav-stacked" >
                    <li className="active"><a data-toggle="pill" href="#tutors">Tutors</a></li>
                    <li><a data-toggle="pill" href="#settings">Settings</a></li>
                    <li><a data-toggle="pill" href="#register">{this.state.tutorClasses.length === 0? "Become a Tutor" : "Tutor Settings"}</a></li>
                    {requests}
                  </ul>
                </div>
              </div>

              <div id="content" className="col-md-10">
                <div className="tab-content">
                  <Tutors />
                  <Settings tutorClasses={this.state.tutorClasses} email={this.state.email} phone={this.state.phone}/>
                  <Registration aboutMe={this.state.about} tutorClasses={this.state.tutorClasses} classes={this.state.classes} price={this.state.price} showGrades={this.state.showGrades}/>
                  <Requests requests={this.state.requests} deleteRequest={this.deleteRequest.bind(this)}/>
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
