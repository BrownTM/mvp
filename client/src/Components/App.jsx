import React from 'react';
import $ from 'jquery';
import AddGuest from './AddGuest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rsvp: '',
      meal: '',
      table: 0
    }
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
        rsvp: 'No Response',
        meal: 'No Response',
        table: 0
      },
      success: () => {
        $('.add').attr('hidden');
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAddGuest}>Add Guest</button>
        <div className="add" hidden>
          <AddGuest onAdd={this.add.bind(this)}/>
          {/* <form>
            <input value={this.state.name} onChange></input>
            <input value={this.state.rsvp}></input>
            <input value={this.state.meal}></input>
            <input value={this.state.table}></input>
          </form> */}
        </div>
      </div>
    );
  }
};

export default App;
