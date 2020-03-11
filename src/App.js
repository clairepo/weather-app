import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NavBar from './NavBar.js';


class App extends Component {
  state = {
    isLoading: true,
    users: [],
    isCelsius: true,
    error: null
  };

  constructor(props){
    super(props);
    this.convertTemp = this.convertTemp.bind(this);
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=b0ea3a08c599d478b89e1c280d32dedc`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          weatherdata: data,
          temp: data.main.temp,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  convertTemp(e){
    e.preventDefault()
    if(this.isCelsius){
      this.temp = this.temp * (9/5) + 32
    }
    else{
      this.temp = (this.temp - 32) * (5/9)
    }
    this.setState(state => ({
      isCelsius: !state.isCelsius
    }));
  }

  render() {
    const { isLoading, weatherdata, error, temp } = this.state;
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
            <div class="cityname">{weatherdata.name}</div>
            <div class="degrees" >{temp}°</div>
            <p class="lead">
              <nav class="nav nav-masthead justify-content-center">
                <div class="nav-link"  onClick={this.convertTemp.bind(this)} >F </div>
                <div class="nav-link active"  onClick={this.convertTemp.bind(this)}> C</div>
              </nav>
              <br/>
              O <br/>
              | <br/>
              \  /<br/>
              |<br/>
              /  \<br/><br/>
              Windspeed: {weatherdata.wind.speed} meter/sec<br/>
              You should wear ... <br/>
            </p>
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link bg-dark text-white" href="#">M</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" href="#">T</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" href="#">W</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" href="#">Th</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" href="#">F</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" href="#">Sa</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" href="#">Su</a></li>
            </ul>
          </div>
        </body>
        </div>


      );
    }
  }
}

export default App;
