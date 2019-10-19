import React from 'react';
import $ from 'jquery';
import AddGuest from './AddGuest.jsx';
import GuestList from './GuestList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: [],
      accepted: 0,
      declined: 0,
      noResponse: 0,
      chicken: 0,
      beef: 0,
      vegetarian: 0
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/guests',
      success: (data) => {
        this.setState({
          guests: data
        });
      }
    }).then((data) => {
      var accepted = 0;
      var declined = 0;
      var noResponse = 0;
      var chicken = 0;
      var beef = 0;
      var vegetarian = 0;
      data.forEach((guest) => {
        if (guest.rsvp === 'Accepted') {
          accepted++;
        } else if (guest.rsvp === 'Declined') {
          declined++;
        } else if (guest.rsvp === 'noResponse') {
          noResponse++;
        }
        if (guest.meal === 'Chicken') {
          chicken++;
        } else if (guest.meal === 'Beef') {
          beef++;
        } else if (guest.meal === 'Vegetarian') {
          vegetarian++;
        }
      });
      this.setState({
        accepted: accepted,
        declined: declined,
        noResponse: noResponse,
        chicken: chicken,
        beef: beef,
        vegetarian: vegetarian
      });
    });
  }

  handleAddGuest() {
    $('.add').removeAttr('hidden');
  }

  add(name) {
    $.ajax({
      type: 'POST',
      url: '/guests',
      data: {
        name: name,
        rsvp: 'noResponse',
        meal: 'noMeal',
        table: 0
      },
      success: () => {
        $('.add').attr('hidden');
      }
    });
  }

  render() {
    // var guests = this.state.guests;
    // var list;
    // if (guests.length === 0) {
    //   list = <span>Let's add some guests!</span>
    // } else {
    //   list = guests.map((guest) => {
    //     return <GuestList key={guest._id} guest={guest}/>
    //   });
    // }

    return (
      <div>
        <button onClick={this.handleAddGuest}>Add Guest</button>
        <div>Accepted: {this.state.accepted}</div>
        <div>Declined: {this.state.declined}</div>
        <div>No Response: {this.state.noResponse}</div>
        <div>Chicken: {this.state.chicken}</div>
        <div>Beef: {this.state.beef}</div>
        <div>Vegetarian: {this.state.vegetarian}</div>
        <div className="add" hidden>
          <AddGuest onAdd={this.add.bind(this)}/>
        </div>
        {/* {list} */}
        {this.state.guests.map((guest) => {
          return <GuestList key={guest._id} guest={guest}/>
        })}
      </div>
    );
  }
};

export default App;
