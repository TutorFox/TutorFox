import React from 'react';

export default class Settings extends React.Component {
  render () {
    return (
      <div id="settings" className="tab-pane fade">
	<h3>Settings</h3>
	<form>
	  <div className="form-group">
	    <label for="emailSet">E-Mail</label>
	    <input type="email" className="form-control" id="emailSet" value={this.props.email}/>
	  </div>
	  <div className="form-group">
	    <label for="telSet">Telephone</label>
	    <input type="tel" className="form-control" id="telSet" placeholder="XXX-XXX-XXXX"/>
	  </div>
	  <button type="button" className="btn btn-primary">Confirm</button>
	  <button type="button" className="btn btn-default">Cancel</button>
	</form>
      </div>	

    );
  }
}
