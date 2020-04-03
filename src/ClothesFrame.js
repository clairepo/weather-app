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

  
    getClothes(){
      var outfit = this.state.outfit;
      var result = []

      var resultStr = "";

      if(this.props.weatherdata.weather[0].main.includes("Clear")) {
        resultStr += "sunglasses, ";
      }
      if(this.props.weatherdata.weather[0].main.includes("Rain")) {
        resultStr += "an umbrella, ";
      }
      if(this.props.weatherdata.main.temp <= 0) {
        resultStr += "a winter coat and scarf, ";
      }
      else if(this.props.weatherdata.main.temp <= 20) {
        resultStr += "a light coat, ";
      }
      else {
        resultStr += "a t-shirt and shorts, ";
      }
      resultStr = resultStr.substr(0, resultStr.length - 2);
      var lastComma = resultStr.lastIndexOf(',');
      if (lastComma > 1)
      resultStr = resultStr.substr(0, lastComma) + " and " + resultStr.substr(lastComma + 1);
      resultStr += ".";

      return {
          arr: result,
          str: resultStr
      };
    }

  render(){
    const clothes = this.getClothes();
    const clothesStr = clothes.str;
    return(
        <div>

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
