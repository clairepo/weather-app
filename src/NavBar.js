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
              <div class="col-12 col-md-8 py-4">
                <h4 class="text-white text-left">About</h4>
                <p class="text-muted text-left">This app.</p>
              </div>
              <div class="col-6 col-md-4 py-4">
              <h4 class="text-white">Find a New City</h4>
              <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
            </div>
          </div>
        </div>
        <nav class="navbar navbar-dark">
          <div class="container d-flex justify-content-between">
            <a href="#" class="navbar-brand d-flex align-items-center"> <FontAwesomeIcon icon={faCloudSunRain}/>  <strong> &nbsp;Weather App</strong> </a>
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
