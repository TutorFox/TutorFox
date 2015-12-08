import React from 'react';
import Router from 'react-router';
let {Link } = Router;

export default class TutorPanel extends React.Component {

  onButtonClick(e) {
  }

  render () {
    const left = this.props.classList.slice(0,5).map(course => {
      return(<li>{course.name}{this.props.showGrades?": "+course.grade:""}</li>);
    })
    const right = this.props.classList.slice(5).map(course => {
      return(<li>{course.name}{this.props.showGrades?": "+course.grade:""}</li>);
    })
    const url = "http://micampus.mxl.cetys.mx/fotos/" +this.props.id.slice(1) +".jpg";
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="col-md-3">
            <img src={url} alt="tutor image" className="img-rounded tutorpic"/>
          </div>
          <div className="col-md-3">
            <h4>{this.props.name}</h4>
            <h5>Available: Mon, Thu, Sat</h5>
            <h4>${this.props.price}</h4>
            <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>{} <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true">{}</span>
          </div>
          <div className="col-md-3">
            <h5>
              <ul>
                {left}
              </ul>
            </h5>
          </div>
          <div className="col-md-3">
            <ul>
              {right}
            </ul>
          </div>
        </div>
        <div className="panel-body">
         <Link to={"/" + this.props.id}><button type="button" className="btn btn-primary pull-right" onClick={this.onButtonClick.bind(this)}>See profile</button></Link>
        </div>
      </div>
    );
  }
}
