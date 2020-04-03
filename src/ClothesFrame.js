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
      var buyStr = "";

      
      if(this.props.weatherdata.weather[0].main.includes("Clear")) {
        resultStr += "sunglasses, ";
        buyStr += "You can purchase sunglasses from Ray-Ban or Sunglass Hut. ";
      }
      if(this.props.weatherdata.weather[0].main.includes("Rain")) {
        resultStr += "an umbrella, ";
        buyStr += "You can purchase umbrellas from Target or Walmart. ";
      }
      if(this.props.weatherdata.main.temp <= 0) {
        resultStr += "a winter coat and scarf, ";
        buyStr += "You can purchase winterwear from The North Face or Patagonia. ";
      }
      else if(this.props.weatherdata.main.temp <= 20) {
        resultStr += "a light coat, ";
        buyStr += "You can purchase jackets from Macy's or Nordstrom's. ";
      }
      else {
        resultStr += "a t-shirt and shorts, ";
        buyStr += "You can purchase summerwear from Primark or Marks & Spencers. ";
      }

      resultStr = resultStr.substr(0, resultStr.length - 2);
      var lastComma = resultStr.lastIndexOf(',');
      if (lastComma > 1)
      resultStr = resultStr.substr(0, lastComma) + " and " + resultStr.substr(lastComma + 1);
      resultStr += ".";

      return {
          arr: result,
          str: resultStr,
          buyStr: buyStr,
          link: this.props.weatherdata.weather[0].icon
      };
    }

  render(){
    const clothes = this.getClothes();
    const clothesStr = clothes.str;
    const buyStr = clothes.buyStr;
    const link ='http://openweathermap.org/img/wn/' + clothes.link.substr(0,2) + 'd@2x.png';
    console.log(link);
    return(
        <div>
            <img src={link} style={{width: 100}}/>
            <p>You should wear {clothesStr}<br/></p>
            <p>{buyStr}</p>
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
