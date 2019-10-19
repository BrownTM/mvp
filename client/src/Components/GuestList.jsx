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
    this.setStates();
  }

  setStates() {
    this.setState({
      rsvp: this.props.guest.rsvp,
      meal: this.props.guest.meal,
      table: this.props.guest.table
    })
    if (this.props.guest.rsvp === 'noResponse') {
      this.setState({
        rsvp: 'No Response'
      });
    }
    if (this.props.guest.meal === 'noMeal') {
      this.setState({
        meal: 'No Meal'
      });
    }
  }

  handleRsvpClick() {
    $(`#rsvpDrop_${this.props.guest._id}`).removeAttr('hidden');
  }

  handleMealClick() {
    $(`#mealDrop_${this.props.guest._id}`).removeAttr('hidden');
  }

  handleTableClick() {
    $(`#tableDrop_${this.props.guest._id}`).removeAttr('hidden');
  }

  handleRsvp(e) {
    this.setState({
      rsvp: e.target.value
    });
    if (e.target.value === 'Accepted') {
      $.ajax({
      method: 'PUT',
      url: '/guests',
      data: {
        name: this.props.guest.name,
        rsvp: e.target.value
      },
      success: () => {
        $(`#rsvpDrop_${this.props.guest._id}`).attr('hidden');
      }
    });
    } else {
      $.ajax({
        method: 'PUT',
        url: '/guests',
        data: {
          name: this.props.guest.name,
          rsvp: e.target.value,
          meal: 'noMeal'
        },
        success: () => {
          $(`#rsvpDrop_${this.props.guest._id}`).attr('hidden');
          this.setState({
            meal: 'No Meal'
          });
        }
      });
    }

  }

  handleMeal(e) {
    this.setState({
      meal: e.target.value
    });
    $.ajax({
      method: 'PUT',
      url: '/guests',
      data: {
        name: this.props.guest.name,
        meal: e.target.value
      },
      success: () => {
        $(`#mealDrop_${this.props.guest._id}`).attr('hidden');
      }
    });
  }

  handleTable(e) {
    this.setState({
      table: e.target.value
    });
    $.ajax({
      method: 'PUT',
      url: '/guests',
      data: {
        name: this.props.guest.name,
        table: e.target.value
      },
      success: () => {
        $(`#tableDrop_${this.props.guest._id}`).attr('hidden');
      }
    });
  }

  deleteGuest() {
    $.ajax({
      method: 'DELETE',
      url: '/guests',
      data: {
        name: this.props.guest.name
      },
      success: () => {
        document.location.reload();
      }
    });
  }

  render() {
    return (
      <div>
        <div className="name"> {this.props.guest.name} </div>
        <div onClick={this.handleRsvpClick.bind(this)}>{this.state.rsvp}</div>
        <select id={`rsvpDrop_${this.props.guest._id}`} onChange={this.handleRsvp.bind(this)} style={{position: 'static'}} hidden>
          <option className="noResponse" value="noResponse">No Response</option>
          <option className="accepted" value="Accepted">Accepted</option>
          <option className="declined" value="Declined">Declined</option>
        </select>
        <div onClick={this.handleMealClick.bind(this)}>{this.state.meal}</div>
        <select id={`mealDrop_${this.props.guest._id}`} onChange={this.handleMeal.bind(this)} hidden>
          <option className="noMeal" value="noMeal">No Response</option>
          <option className="chicken" value="Chicken">Chicken</option>
          <option className="beef" value="Beef">Beef</option>
          <option className="vegetarian" value="Vegetarian">Vegetarian</option>
        </select>
        <div onClick={this.handleTableClick.bind(this)}>{this.state.table}</div>
        <select id={`tableDrop_${this.props.guest._id}`} onChange={this.handleTable.bind(this)} hidden>
          <option className="notAssigned" value="notAssigned">0</option>
        </select>
        <button onClick={this.deleteGuest.bind(this)}>Delete</button>
      </div>
    );
  }
};

export default GuestList;
