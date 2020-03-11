import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=b0ea3a08c599d478b89e1c280d32dedc`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          weatherdata: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    const { isLoading, weatherdata, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
              <h1>{weatherdata.name}</h1>
              Temperature: {weatherdata.main.temp} <br/>
              Windspeed: {weatherdata.wind.speed}
        </div>
      );
    }
  }
}

export default App;
