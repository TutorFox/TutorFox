import React from 'react';
import RequestPanel from './RequestPanel';

export default class Requests extends React.Component {
  render () {
    const reqs = this.props.requests.map((req, i) => {
      return (
          <RequestPanel id={req.user} course={req.course} deleteRequest={this.props.deleteRequest.bind(null, [i])}/>
      )
    })
    return (
      <div id="requests" className="tab-pane fade">
        <h3>Requests</h3>
        {reqs}
      </div>

    );
  }
}
