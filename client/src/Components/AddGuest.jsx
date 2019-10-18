import React from 'react';

class AddGuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    }
  }

  handleFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  handleLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  // handleRsvp(e) {
  //   this.setState({
  //     rsvp: e.target.value
  //   });
  // }

  // handleMeal(e) {
  //   this.setState({
  //     meal: e.target.value
  //   });
  // }

  // handleTable(e) {
  //   this.setState({
  //     table: e.target.value
  //   });
  // }

  addGuest() {
    var name = this.state.firstName + ' ' + this.state.lastName;
    this.props.onAdd(name);
  }

  render() {
    return (
      <form>
        <input value={this.state.firstName} onChange={this.handleFirstName.bind(this)} placeholder='First Name'></input>
        <input value={this.state.lastName} onChange={this.handleLastName.bind(this)} placeholder='Last Name'></input>
        {/* <select className="rsvpDrop" onChange={this.handleRsvp.bind(this)}>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
          <option value="noResponse">No Response</option>
        </select>
        <select className="mealDrop" onChange={this.handleMeal.bind(this)}>
          <option value="noResponse">No Response</option>
          <option value="chicken">Chicken</option>
          <option value="beef">Beef</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
        <select className="tableDrop" onChange={this.handleTable.bind(this)}>
          <option value="notAssigned">0</option>
        </select> */}
        <button onClick={this.addGuest.bind(this)}></button>
      </form>
    );
  }
};

export default AddGuest;
