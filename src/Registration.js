import React from 'react';
export default class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.handleChecked = this.handleChecked.bind(this);
    this.checkClasses = this.checkClasses.bind(this);
    this.state = {count: this.props.tutorClasses.length, checked: []};
  }
  componentDidMount() {
    setTimeout(this.checkClasses,500);
    setTimeout( () => {
      React.findDOMNode(this.refs.price).value = this.props.price;
      React.findDOMNode(this.refs.aboutMe).value = this.props.aboutMe;
    }, 500);
    setTimeout( () => {
      React.findDOMNode(this.refs.showGrades).checked = this.props.showGrades;
    }, 500);
  }
  checkClasses() {
    if(this.props.classes.lenght == 0){
      setTimeout(this.checkClasses, 500);
    }
    else {
      let checked= [];
      for(let a = 0; a < this.props.classes.length; ++a){
        checked.push(false);
      }
      for(let i = 0; i < this.props.tutorClasses.length; ++i){
        for(let j = 0; j < this.props.classes.length; ++j){
          if(this.props.tutorClasses[i].name == this.props.classes[j].name){
            checked[j] = true;
          }
        }
      }
      this.setState({checked: checked});
    }
  }


  handleChecked(e) {
    if(e.target.checked) {
      if(this.state.count >= 10) {
        e.target.checked = false;
      } else {
        let checked = this.state.checked.slice();
        checked[Number(e.target.value)] = true;
        this.setState({count: this.state.count + 1, checked: checked});
      }
    } else {
        let checked = this.state.checked.slice();
        checked[Number(e.target.value)] = false;
      this.setState({count: this.state.count - 1, checked: checked});
    }
  }

  sendRegistration() {
    let tutorClasses = [];
    var that = this;
    $('input:checked','#registrationform').each(function () {
      const value = $(this).val();
      tutorClasses.push(that.props.classes[value]);
    });

    const price = React.findDOMNode(this.refs.price).value;
    const showGrades = React.findDOMNode(this.refs.showGrades).checked;
    const aboutMe = React.findDOMNode(this.refs.aboutMe).value;
    $.ajax({
      url: 'users/classes/'+localStorage.user,
      type: 'POST',
      data: {tutorClasses: tutorClasses, price: price, showGrades: showGrades, aboutMe: aboutMe},
      dataType: "json",
      success: function(data) {
        location.reload();
      }
    });
  }
  render() {
    const length = this.props.classes.length;
    const left = this.props.classes.slice(0, length/2).map((course, index) => {
      return (<label className="checkbox"><input type="checkbox" key={index} value={index} onChange={this.handleChecked} checked={this.state.checked[index]}/>
          {course.name} {course.grade}</label>);
    })
    const right = this.props.classes.slice(length/2).map((course, index) => {
      return (<label className="checkbox"><input type="checkbox" key={Math.floor(length/2) + index } value={Math.floor(length/2) + index} onChange={this.handleChecked} checked={this.state.checked[Math.floor(length/2) + index]}/>
          {course.name} {course.grade}</label>);
    })
    return (
      <div id="register" className="tab-pane fade">
        <h3>Register as a Tutor</h3>
        <p>After finishing this registration process, your name will appear in the Tutors section for all students to see.</p>
        <hr/>
        <form id="registrationform">
          <div className="row">
            <h4><button type="button" className="btn" data-toggle="collapse" data-target="#subjects"><span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button> Subjects</h4>
            <div id="subjects" className="collapse in">
              <p>Choose the subjects you wish to teach. <span className="text-muted">(Maximum of 10)</span></p>
              <div id="subjectColumns" className="row">
                <div className="col-md-3">
                  {left}
                </div>
                <div className="col-md-3">
                  {right}
                </div>
              </div>
              <div className="row">
                <div className="col-md-3"><label className="checkbox" for="showGrades"><input type="checkbox" id="showGrades" ref="showGrades"/> Show your grades for these subjects</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="input" htmlFor="#price">Price (MX Pesos)</label>
              <div id="priceGroup" className="input-group">
                <span className="input-group-addon">$</span>
                <input type="number" min="0" max="999" step="1" id="price" ref="price" className="form-control" aria-label="Amount"/>
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-3">
              <label className="input" htmlFor="#aboutMe"> About Me </label>
              <div id="aboutMeGroup" className="input-group">
                  <input type="text" id="aboutMe" ref="aboutMe" placeholder="hello, I'm here to tutor you" className="form-control"/>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row" style={{paddingLeft: 15}}>
            <button type="button" className="btn btn-primary" onClick={this.sendRegistration.bind(this)}>Confirm</button>
            <button type="button" className="btn btn-default">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}
