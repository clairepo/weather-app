import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component{
  render(){
    return(
      <div className="headerAndCollapse">
        <div class="collapse" id="collapseExample">
          <div class="container">
            <div class="row">
              <div class="col-sm-8 col-md-7 py-4">
                <h4 class="text-white">About</h4>
              </div>
            </div>
          </div>
        </div>
        <nav class="navbar navbar-dark">
          <div class="container d-flex justify-content-between">
            <a href="#" class="navbar-brand d-flex align-items-center"> <FontAwesomeIcon icon={faCloudSunRain}/>  <strong>  Weather App</strong> </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar;
