import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NavBar from './NavBar.js';


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
        <div className="App">
        <header class="masthead mb-auto">
          <NavBar />
        </header>
        <body class="text-center">
          <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

            <h1>{weatherdata.name}</h1>
            <p class="lead">
            <div class = "degrees" >{weatherdata.main.temp}°</div><br/>
            F C <br/>
            images <br/>
            Windspeed: {weatherdata.wind.speed} <br/>
            You should wear ... <br/>
            M T W Th F Sa Su
            </p>
          </div>
        </body>
        </div>


      );
    }
  }
}

export default App;
