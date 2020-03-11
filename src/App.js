import React, { Component } from 'react';
import './App.css';
import WeekContainer from './WeekContainer';

class App extends Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  fetchUsers() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=b0ea3a08c599d478b89e1c280d32dedc`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { isLoading, users, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
              {users.name}
        </div>
      );
    }
  }
}

export default App;
