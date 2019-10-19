import React from 'react';
import $ from 'jquery';
import AddGuest from './AddGuest.jsx';
import GuestList from './GuestList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: []
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
    var guests = this.state.guests;
    console.log(Array.isArray(guests));
    console.log(guests);
    var list;
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
        <div className="add" hidden>
          <AddGuest onAdd={this.add.bind(this)}/>
        </div>
        {list}
        {/* {guests.map((guest) => {
          return <GuestList key={guest._id} guest={guest}/>
        })} */}
      </div>
    );
  }
};

export default App;
