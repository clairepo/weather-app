import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import './App.css';
import NavBar from './NavBar.js';
import bg from './bg.jpg';


class App extends Component {
  state = {
    isLoading: true,
    users: [],
    isCelsius: true,
    error: null,
    cityName: "London"
  };

  constructor(props){
    super(props);
    this.convertTemp = this.convertTemp.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.getClothes = this.getClothes.bind(this);
    this.getClothesStr = this.getClothesStr.bind(this);
    this.isInBoundaries = this.isInBoundaries.bind(this);
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=`+ this.state.cityName +`&units=metric&APPID=b0ea3a08c599d478b89e1c280d32dedc`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          weatherdata: data,
          temp: parseFloat(data.main.temp).toFixed(0),
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
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

  isInBoundaries(boundaries, value)
  {
    if(boundaries.includes(":")) //upper and lower boundary
    {
      var split = boundaries.split(":");
      var lowerbound = split[0];
      var upperbound = split[1];
      return value >= lowerbound && value <= upperbound;
    }
    if(boundaries.includes("+")) //lower boundary
    {
      var lowerbound = boundaries.substr(0, boundaries.indexOf("+"));
      return value >= lowerbound;
    }
    if(boundaries.includes("-")) //upper boundary
    {
      var upperbound = boundaries.substr(0, boundaries.indexOf("-"));
      return value <= upperbound;
    }
    return false;
  }

  getClothes(){
    var outfit = require('./outfit.json');
    var result = []
    for(var garment in outfit)
    { //console.log(garment);
      var flag = true;
      for(var constraint in outfit[garment])
      { //console.log(constraint);
        if(constraint == "cloudcover")
        {
          if(!this.isInBoundaries(outfit[garment][constraint], this.state.weatherdata.clouds.all))
          {
            flag = false;
            break;
          }
        }
        else if(constraint == "temperature")
        {
          if(!this.isInBoundaries(outfit[garment][constraint], this.state.weatherdata.main.feels_like))
          {
            flag = false;
            break;
          }
        }
        else if(constraint == "raining")
        {
          if(!this.state.weatherdata.weather[0].main.includes("Rain"))
          {
            flag = false;
            break;
          }
        }
      }
      if(flag)
      {
        result.push(garment);
      }
    }
    return result; //console.log(outfit); //console.log(result);
  }

  getClothesStr(){
    var clothes = this.getClothes();
    //console.log(arr);
    if(clothes.length < 1)
      return "anything!";
    var result = "";
    for(var garment of clothes)
    {
      result += garment + ", "
    }
    result = result.substr(0, result.length - 2);
    var lastComma = result.lastIndexOf(',');
    if (lastComma > 1)
      result = result.substr(0, lastComma) + " and a " + result.substr(lastComma + 1);
    result = " a " + result + ".";
    return result;
  }

  changeDay(e){
    e.preventDefault();


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
          <img src={bg} alt="" />
          <div id="top" class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <p class="cityname">{weatherdata.name}</p>
            <div class="degrees">&nbsp;{temp}°</div>
            <p class="lead">
              <nav class="nav nav-masthead justify-content-center">
                <div id="F" class={this.state.isCelsius ? "nav-link": "nav-link active"}  onClick={this.convertTemp} >F </div>
                <div id="C" class={this.state.isCelsius ? "nav-link active": "nav-link"}  onClick={this.convertTemp}> C</div>
              </nav>
              <br/>
              O <br/>
              | <br/>
              \  /<br/>
              |<br/>
              /  \<br/><br/>
              Windspeed: {weatherdata.wind.speed} meter/sec<br/>
              You should wear {this.getClothesStr()} <br/>
            </p>
            <ul class="pagination justify-content-center">
              <li class="page-item disabled"><a class="page-link bg-light text-dark" onClick={this.changeDay}>W</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" onClick={this.changeDay}>Th</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" onClick={this.changeDay}>F</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" onClick={this.changeDay}>Sa</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" onClick={this.changeDay}>Su</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" onClick={this.changeDay}>M</a></li>
              <li class="page-item"><a class="page-link bg-dark text-white" onClick={this.changeDay}>T</a></li>
            </ul>
          </div>
        </body>

        </div>


      );
    }
  }
}

export default App;
