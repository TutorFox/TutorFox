import React from 'react';

export default class RequestPanel extends React.Component {
  constructor() {
    super();
    this.state = {reqName: "", reqEmail: "", reqPhone: ""};
  }

  componentDidMount() {
    var that = this;
    $.ajax({
      url: '/users/' + this.props.id,
      dataType: 'json',
      success(data) {
        that.setState({reqName: data.name, reqEmail: data.email, reqPhone: data.phone})
      }
    })
  }

  render () {
    return (
      <div className="panel panel-default">
        <div className="panel-header">
          <button type="button" className="close " aria-label="Close"><span aria-hidden="true" className="closebtn">&times;</span></button>
          <h4>{this.state.reqName}</h4>
        </div>
        <div className="panel-body">
          <p>Telefono: {this.state.reqPhone}</p>
          <p>E-mail: {this.state.reqEmail} </p>
          <p>Class: {this.props.course}</p>
        </div>
        <div className="panel-footer">
        </div>
      </div>
    );
  }
}
