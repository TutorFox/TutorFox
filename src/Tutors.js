import React from 'react';
import TutorPanel from './TutorPanel';

export default class Tutors extends React.Component {
  constructor() {
    super();
    this.state = {tutors: []};
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    const that = this;
    $.ajax({
      url:'tutors',
      type: 'GET',
      success: function (data) {
        that.setState({tutors: data});
      }
    })
  }

  search(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    const that = this;
    $.ajax({
      url:'tutors?name='+name,
      type: 'GET',
      success: function (data) {
        that.setState({tutors: data});
        React.findDOMNode(that.refs.name).value = "";
      }
    })
  }
  render () {
    const tutorList = this.state.tutors.map(tutor => {
      return (<TutorPanel name={tutor.name} id={tutor.user} showGrades={true} price="420" classList={tutor.tutorClasses}/>);
    })
    return(
      <div id="tutors" className="tab-pane fade in active">
        <h3>Search for your Tutor</h3>
        <div id="custom-search-input">
          <div className="input-group col-md-10">
            <form onSubmit={this.search.bind(this)}>
              <input ref="name" type="text" className="search-query form-control" placeholder="Enter Name of Tutor or Subject" />
            </form>
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button"><span className="glyphicon glyphicon-search"></span></button>
            </span>
          </div>
        </div>
        <hr/>
        {tutorList}
      </div>

    );
  }
}
