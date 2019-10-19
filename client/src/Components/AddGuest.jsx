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

  addGuest() {
    if (this.state.firstName.length === 0) {
      alert('Please enter a first name!');
    } else if (this.state.lastName.length === 0) {
      alert('Please enter a last name!');
    } else {
      var name = this.state.firstName + ' ' + this.state.lastName;
      this.props.onAdd(name);
    }
  }

  render() {
    return (
      <form>
        <input value={this.state.firstName} onChange={this.handleFirstName.bind(this)} placeholder='First Name'></input>
        <input value={this.state.lastName} onChange={this.handleLastName.bind(this)} placeholder='Last Name'></input>
        <button onClick={this.addGuest.bind(this)}>Submit</button>
      </form>
    );
  }
};

export default AddGuest;
