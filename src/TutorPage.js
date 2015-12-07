import GeneralNavbar from './GeneralNavbar';
import requireAuth from './requireAuth';
import React from 'react';
import Router from 'react-router';
import auth from './auth';
import Comment from './Comment';
let { Link } = Router;

export var TutorPage = requireAuth(class extends React.Component {

  constructor() {
    super();
    this.state = {
      selected: "choose a subject",
      name: "",
      tutorName: "",
      email : "",
      price: "",
      phone: "",
      classes: [],
      tutorClasses: [],
      reviews: [],
      likes: [],
      dislikes: [],
      showGrades: true,
    };

    this.handlelogout = this.handlelogout.bind(this);
  }

  handlelogout () {
    auth.logout();
  }

  componentDidMount(){
    this.reloadData();
    $.ajax({
      url: '/users/'+localStorage.user,
      type: 'GET',
      success: function (data) {
        this.setState({
          name: data.name,
        });
      }.bind(this)
    })
  }

  reloadData() {
    $.ajax({
      url: '/users/'+this.props.params.id,
      type: 'GET',
      success: function (data) {
        this.setState({
          tutorName: data.name,
          price: data.price,
          phone: data.phone,
          email: data.email,
          classes: data.classes,
          tutorClasses: data.tutorClasses,
          reviews : data.reviews,
          likes : data.likes,
          dislikes: data.dislikes,
          showGrades: data.showGrades
        });
      }.bind(this)
    })
  }

  handleClick(e) {
    this.setState({selected: e.target.innerHTML});
  }

  sendLike(value) {
    var that = this;
    $.ajax({
      url: 'like/' + this.props.params.id,
      type: 'POST',
      data: {user: localStorage.user, vote: value},
      dataType: 'json',
      success: function() {
        that.reloadData();
      }
    })
  }

  handleLike(e) {
    if(e.target.classList.contains("up")) {
      this.sendLike(1);
    }

    if(e.target.classList.contains("down")) {
      this.sendLike(-1);
    }
  }

  onButtonClick(e) {
    alert('button clicked' + this.props.id);
    $.ajax({
      url: 'request/' + this.props.params.id,
      type: 'POST',
      data: {localUser:{user: localStorage.user, course: this.state.selected }},
      dataType: 'json',
      success: function() {
        alert('tutor notified');
      }
    })
  }

  handleComment(e) {
    alert('button comment');
    let comment = React.findDOMNode(this.refs.comment).value;
    let that = this;
    $.ajax({
      url: 'review/' + this.props.params.id,
      type: 'POST',
      data: {user: localStorage.user, comment: comment.trim()},
      dataType: 'json',
      success: function() {
        alert('comment sent');
        React.findDOMNode(that.refs.comment).value = " ";
        that.reloadData();
      }
    })

  }

  render () {
    const left = this.state.tutorClasses.slice(0,5).map(course => {
      return(<li>{course.name}{this.state.showGrades?": "+course.grade:""}</li>);
    })
    const right = this.state.tutorClasses.slice(5).map(course => {
      return(<li>{course.name}{this.state.showGrades?": "+course.grade:""}</li>);
    })

    const dropdown = this.state.tutorClasses.map(course => {
      return (<li><a  data-value = {course.name} onClick={this.handleClick.bind(this)}>{course.name}</a></li> )
    })
    var imgsrc = "http://micampus.mxl.cetys.mx/fotos/"+(this.props.params.id.substr(1))+".jpg";

    const comments = this.state.reviews.map(review => {
      return (<Comment comment={review.comment} user={review.id} like={this.state.likes.indexOf(review.id) !== -1} dislike={this.state.dislikes.indexOf(review.id) !== -1}/>)
    })
    return (
        <div>
          <link href="tutorpage.css" type="text/css" rel="stylesheet"/>
          <div className="row">
            <GeneralNavbar loggedIn={true} name={this.state.name} handleClick={this.handleLogout} />
          </div>
          <div className="container-fluid" id="everything">
            <div className="row">
              <div className="panel panel-default">
                <div className="panel-header">
                  <center><h2>{this.state.tutorName}</h2></center>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-2">
                      <img src={imgsrc} alt="tutor image" className="img-circle tutorpic" />
                    </div>
                    <div className="col-md-3">
                      <h5>Available: Mon, Thu, Sat</h5>
                      <h4>{this.state.price}$</h4>
                      <button type="button" onClick={this.handleLike.bind(this)} className="btn btn-success up"><span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>{this.state.likes.length}</button>
                      <button type="button" onClick={this.handleLike.bind(this)} className="btn btn-danger down"><span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>{this.state.dislikes.length}</button>
                    </div>
                    <div className="col-md-3">
                      <h5>
                        <ul>
                          {left} </ul>
                      </h5>
                    </div>
                    <div className="col-md-3">
                      <ul>
                        {right}
                      </ul>
                    </div>
                  </div>
                  <h4 style={{textIndent: 1 + "em"}}>About Me</h4>
                  <p>Gamer dudes, dudettes. When it comes to keeping your gaming gear at peak performance; oh the games people play. I'll tell ya, really. A lot of you game assassins seem to think that skill alone will get you to the victory lane, as you go leaping from level to level, room to room, and world to world; with little or no effort. Oh, planet rangers! Do you want to know a dirty little secret? Yeah-Huh? Do ya? Do ya? Go to www.dust-off.com/dirtygaming to learn more.</p>
                </div>
                <div className="panel-footer">
                  <button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#requestModal">Request Tutor</button>
                </div>
              </div>
            </div>
            <h3 style={{textIndent: 1 +'em'}}>Write your Review for this Tutor</h3>
            <form>
              <div className="btn-group" role="group">
                <button type="button" onClick={this.handleLike.bind(this)} className="btn btn-success up"><span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button>
                <button type="button" onClick={this.handleLike.bind(this)} className="btn btn-danger down"><span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
              </div>
              <textarea ref="comment" className="form-control" rows="5" placeholder="Write a review."></textarea>
              <div className="btn-group" onClick={this.handleComment.bind(this)} role="group"><button type="button" className="btn btn-primary" id="submitreview">Submit</button></div>
            </form>
            <h3 style={{textIndent: 1 +'em'}}>Reviews</h3>

            {comments}


          </div>
            <div className="modal fade" id="requestModal" tabindex="-1" role="dialog" aria-labelledby="logInModalLaber">
              <div className="modal-dialog " role="dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="logInModalLabel">Request this Tutor</h4>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <div className="btn-group" id="subjectchoose">
                          <a className="btn btn-default dropdown-toggle btn-select" data-toggle="dropdown" href="#">{this.state.selected}<span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            {dropdown}
                          </ul>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onButtonClick.bind(this)} >Request</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
  }
})
