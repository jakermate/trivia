import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home'
import Splash from './components/splash'
import Setup from './components/setup/Setup'
import styled from 'styled-components'
import {BrowserRouter, Route} from 'react-router-dom'
import Game from './components/Game/Game'
import GameOptions from './components/setup/GameOptions'


class App extends Component {
  constructor(){
    super()
    this.state={
      location: "/"
    }
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

        {/* temp for testing */}
        <GameOptions></GameOptions>

        {/* temp for testing */}



          {/* <BrowserRouter>
            <Route exact path='/' component={Home} />
            <Route exact path="/setup" component={Setup} />
            <Route path="/game" component={Game} />
          </BrowserRouter> */}
          
          {/* <Splash />
          <Home /> */}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </header>
      </div>
    );
  }
}

export default App;
