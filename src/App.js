import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import './App.css';
import NavBar from './NavBar.js';
import ClothesFrame from './ClothesFrame.js';
import bg from './bg.jpg';


class App extends Component {
  state = {
    isLoading: true,
    users: [],
    isCelsius: true,
    error: null,
    cityName: "London",
    forecast: null,
    day: 0
  };

  constructor(props){
    super(props);
    this.updateWeather = this.updateWeather.bind(this);
    this.convertTemp = this.convertTemp.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.changeCity = this.changeCity.bind(this);
  }

  componentDidMount() {
    this.updateWeather();
  }

  updateWeather(cityName = null)
  {
    if(cityName == null)
      cityName = this.state.cityName;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=`+ cityName +`&units=metric&APPID=b0ea3a08c599d478b89e1c280d32dedc`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          weatherdata: data,
          temp: parseFloat(data.main.temp).toFixed(0),
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=`+ cityName +`&units=metric&APPID=b0ea3a08c599d478b89e1c280d32dedc`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          forecast: data.list
        })
      )
      .catch(error => this.setState({ error }));
  }

  convertTemp(e){
    if((this.state.isCelsius && e.target.id =="F") || (!this.state.isCelsius && e.target.id =="C")){
      if(e.target.id =="F"){
        this.temp = (this.state.temp * (9/5) + 32).toFixed(0);
      }
      if(e.target.id =="C"){
        this.temp = ((this.state.temp - 32) * (5/9)).toFixed(0);
      }
      this.setState(state => ({
        isCelsius: !this.state.isCelsius,
        temp: this.temp
      }));
    }
  }

  changeDay(e){
    e.preventDefault();
    var day = parseInt(e.target.id.substr(3), 10);
    if(day == 0)
    {
      this.updateWeather();
      this.setState({
        day: day
      })
      return;
    }
    var dayforecasts = [];
    for(var forecast of this.state.forecast)
    {
      dayforecasts.push(forecast);
      
    }
    if(dayforecasts.length < day || dayforecasts[day] == null) //we don't have the forecast for this day yet
      return;

    this.setState({
      day: day,
      weatherdata: dayforecasts[day],
      temp: parseFloat(dayforecasts[day].main.temp).toFixed(0),
      isCelsius: true
    })
  }

  changeCity(city) {
    this.setState({
      cityName: city,
      day: 0
    });
    this.updateWeather(city);
  }

  render() {
    const { isLoading, weatherdata, error, temp } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      var daynames = ["Su","M","T","W","T","F","Sa"];
      var today = new Date().getDay(); //0 for sunday, 1 for monday...
      var daylist = [0,1,2,3,4,5,6].map(function(day){
        return (<li class={this.state.day == day ? "page-item disabled": "page-item"}><a id={"day" + day} class={this.state.day == day ? "page-link bg-light text-dark": "page-link bg-dark text-white"} onClick={this.changeDay}>{daynames[(day+today)%daynames.length]}</a></li>);
      }, this);
      return (
        <div className="App">

        <header class="masthead mb-auto">
          <NavBar changeCity={this.changeCity}/>
        </header>

        <body class="text-center">
          <img src={bg} alt="" />
          <div id="top" class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <p class="cityname">{this.state.cityName}</p>
            <div class="degrees">&nbsp;{temp}°</div>
            <div class="lead">
              <nav class="nav nav-masthead justify-content-center">
                <div id="F" class={this.state.isCelsius ? "nav-link": "nav-link active"}  onClick={this.convertTemp} >F </div>
                <div id="C" class={this.state.isCelsius ? "nav-link active": "nav-link"}  onClick={this.convertTemp}> C</div>
              </nav>
              <br/>
            </div>
            <ClothesFrame weatherdata={this.state.weatherdata}/>
            <p>Windspeed: {weatherdata.wind.speed} meter/sec<br/></p>
            <ul class="pagination justify-content-center">
              {daylist}
            </ul>
          </div>
        </body>

        </div>


      );
    }
  }
}

export default App;
/*
<p class="cityname">{weatherdata.name}</p>



<li class={this.state.day == 0 ? "page-item disabled": "page-item"}><a id="day0" class={this.state.day == 0 ? "page-link bg-light text-dark": "page-link bg-dark text-white"} onClick={this.changeDay}>W</a></li>
<li class={this.state.day == 1 ? "page-item disabled": "page-item"}><a id="day1" class={this.state.day == 1 ? "page-link bg-light text-dark": "page-link bg-dark text-white"} onClick={this.changeDay}>Th</a></li>
<li class={this.state.day == 2 ? "page-item disabled": "page-item"}><a id="day2" class={this.state.day == 2 ? "page-link bg-light text-dark": "page-link bg-dark text-white"} onClick={this.changeDay}>F</a></li>
<li class={this.state.day == 3 ? "page-item disabled": "page-item"}><a id="day3" class={this.state.day == 3 ? "page-link bg-light text-dark": "page-link bg-dark text-white"} onClick={this.changeDay}>Sa</a></li>
<li class={this.state.day == 4 ? "page-item disabled": "page-item"}><a id="day4" class={this.state.day == 4 ? "page-link bg-light text-dark": "page-link bg-dark text-white"} onClick={this.changeDay}>Su</a></li>
<li class={this.state.day == 5 ? "page-item disabled": "page-item"}><a id="day5" class={this.state.day == 5 ? "page-link bg-light text-dark": "page-link bg-dark text-white"} onClick={this.changeDay}>M</a></li>
<li class={this.state.day == 6 ? "page-item disabled": "page-item"}><a id="day6" class={this.state.day == 6 ? "page-link bg-light text-dark": "page-link bg-dark text-white"} onClick={this.changeDay}>T</a></li>

              */
