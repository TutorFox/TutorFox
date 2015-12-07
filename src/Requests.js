import React from 'react';
import RequestPanel from './RequestPanel';

export default class Requests extends React.Component {
  render () {
    const reqs = this.props.requests.map(req => {
      return (
          <RequestPanel id={req.user} course={req.course}/>
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
