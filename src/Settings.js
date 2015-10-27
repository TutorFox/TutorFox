import React from 'react';
import Router from 'react-router';
let {Link} = Router;

export default class Settings extends React.Component {
  componentDidMount(){
    setTimeout(this.getPhone.bind(this), 500);
  }
  getPhone(){
    React.findDOMNode(this.refs.phone).value = this.props.phone;
    if(!React.findDOMNode(this.refs.phone).value){
      setTimeout(this.getPhone.bind(this), 500);
    }
  }
  handleClick(e) {
    const email = React.findDOMNode(this.refs.email).value.trim();
    const phone = React.findDOMNode(this.refs.phone).value.trim();
    const that = this;
    $.ajax({
      url: 'users/'+localStorage.user,
      type: 'POST',
      data: {email: email, phone: phone, tutorClasses: that.props.tutorClasses},
      dataType: "json",
      success: function () {
        location.reload();
      }
    });
  }
  render () {
    return (
      <div id="settings" className="tab-pane fade">
	<h3>Settings</h3>
	<form>
	  <div className="form-group">
	    <label for="emailSet">E-Mail</label>
	    <input type="email" className="form-control" ref="email" id="emailSet" value={this.props.email}/>
	  </div>
	  <div className="form-group">
	    <label for="telSet">Telephone</label>
	    <input type="tel" className="form-control" id="telSet" ref="phone" />
	  </div>
          <button type="button" className="btn btn-primary" onClick={this.handleClick.bind(this)}>Confirm</button>
	  <button type="button" className="btn btn-default">Cancel</button>
	</form>
      </div>	

    );
  }
}
