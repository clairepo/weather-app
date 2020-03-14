import React, { Component } from 'react';

class ClothesFrame extends Component{

    constructor(props){
        super(props);

        this.getClothes = this.getClothes.bind(this);
        this.getClothesStr = this.getClothesStr.bind(this);
        this.isInBoundaries = this.isInBoundaries.bind(this);
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
            if(!this.isInBoundaries(outfit[garment][constraint], this.props.weatherdata.clouds.all))
            {
              flag = false;
              break;
            }
          }
          else if(constraint == "temperature")
          {
            if(!this.isInBoundaries(outfit[garment][constraint], this.props.weatherdata.main.feels_like))
            {
              flag = false;
              break;
            }
          }
          else if(constraint == "raining")
          {
            if(!this.props.weatherdata.weather[0].main.includes("Rain"))
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

  render(){
    return(
        <p>
            O <br/>
            | <br/>
            \  /<br/>
            |<br/>
            /  \<br/><br/>
            You should wear {this.getClothesStr()} <br/>
        </p>
    )
  }
}

export default ClothesFrame;