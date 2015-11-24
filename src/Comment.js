import React from 'react';

export default class Comment extends React.Component { 
  constructor() {
    super();
    this.state = {name: ""};
  }

  componentDidMount() {

    $.ajax({
      url: '/users/'+this.props.user,
      type: 'GET',
      success: function (data) {
        this.setState({
          name: data.name,
        });
      }.bind(this)
    });
  }
  
  render() {
    var panel = "panel ";
    var gliphy = "glyphicon ";
    if(this.props.like) {
      panel += "panel-success";
      gliphy += "glyphicon-thumbs-up";
    }
    if(this.props.dislike) { 
      panel += "panel-danger";
      gliphy += "glyphicon-thumbs-down";
    }
    return (
      <div className={panel}>
        <div className="panel-heading">
          <h4 className="panel-title"><span className={gliphy} aria-hidden="true"></span>{this.state.name}</h4>
        </div>
        <div className="panel-body">
          <p>{this.props.comment}</p>
        </div>
      </div>
    );
  }
}
