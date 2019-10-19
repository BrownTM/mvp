import React from 'react';
import $ from 'jquery';

class GuestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvp: '',
      meal: '',
      table: 0
    }
  }

  componentDidMount() {
    $(`.${this.props.guest.rsvp}`).attr('selected');
    $(`.${this.props.guest.meal}`).attr('selected');
    $(`.${this.props.guest.table}`).attr('selected');
  }

  handleRsvp(e) {
    this.setState({
      rsvp: e.target.value
    });
  }

  handleMeal(e) {
    this.setState({
      meal: e.target.value
    });
  }

  handleTable(e) {
    this.setState({
      table: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="name">{this.props.guest.name}</div>
        <select className="rsvpDrop" onChange={this.handleRsvp.bind(this)}>
          <option className="accepted" value="accepted">Accepted</option>
          <option className="declined" value="declined">Declined</option>
          <option className="noResponse" value="noResponse">No Response</option>
        </select>
        <select className="mealDrop" onChange={this.handleMeal.bind(this)}>
          <option className="noMeal" value="noMeal">No Response</option>
          <option className="chicken" value="chicken">Chicken</option>
          <option className="beef" value="beef">Beef</option>
          <option className="vegetarian" value="vegetarian">Vegetarian</option>
        </select>
        <select className="tableDrop" onChange={this.handleTable.bind(this)}>
          <option className="notAssigned" value="notAssigned">0</option>
        </select>
      </div>
    );
  }
};

export default GuestList;


//map through guestlist
//change in anything will call the same function