import React, { Component } from 'react';

class NavBar extends Component{
  render(){
    return(
      <nav class="navbar navbar-dark">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center"> <strong>Weather App</strong> </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    )
  }
}

export default NavBar;
