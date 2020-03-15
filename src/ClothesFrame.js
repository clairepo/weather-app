import React, { Component } from 'react';

class ClothesFrame extends Component{
    state = {
        outfit: require('./outfit.json'),
        clothesimages: (function()
        {
            let outfit = require('./outfit.json');
            let result = {};
            for(var garment in outfit)
            {
                for(var prop in outfit[garment])
                {
                    if(prop == "img")
                    {
                        const imgName=outfit[garment][prop].split('/').slice(-1);
                        result[garment] = require(`./img/${imgName}`);
                        //result[garment] = require(outfit[garment][prop]);  //"Cannot find module './img/hat.svg'" What the hell is wrong with ReactJS....
                    }
                }
            }
            //console.log(result);
            return result;
        })()
    }

    constructor(props){
        super(props);
        this.getClothes = this.getClothes.bind(this);
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
      var outfit = this.state.outfit;
      var result = []
      for(var garment in outfit)
      {
        var flag = true;
        for(var constraint in outfit[garment])
        {
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
          else if(constraint == "sun")
          {
            var ts = Math.round(Date.now() / 1000);
            if(!(ts > this.props.weatherdata.sys.sunrise  && ts < this.props.weatherdata.sys.sunset))
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

      var resultStr = "whatever you want!";
      if(result.length > 0)
      {
        resultStr = "";
        for(var garment of result)
        {
          resultStr += outfit[garment]["prefix"] + garment + ", "
        }
        resultStr = resultStr.substr(0, resultStr.length - 2);
        var lastComma = resultStr.lastIndexOf(',');
        if (lastComma > 1)
        resultStr = resultStr.substr(0, lastComma) + " and " + resultStr.substr(lastComma + 1);
        resultStr += ".";
      }

      return {
          arr: result,
          str: resultStr
      }; //console.log(outfit); //console.log(result);
    }

  render(){
    const clothes = this.getClothes();
    const clothesStr = clothes.str;
    var clothesimg = clothes.arr.map(function(str){
        if(this.state.clothesimages[str] != null)
        {
            return (<div><img src={this.state.clothesimages[str]} style={{width: this.state.outfit[str]["width"]}}/></div>);
        }
        return null;
    }, this);
    return(
        <div>
            {clothesimg}
            <p>You should wear {clothesStr}<br/></p>
        </div>
    )
  }
}

export default ClothesFrame;

/*
<p>
0<br/>
|<br/>
\  /<br/>
|<br/>
/  \<br/>
</p>
*/