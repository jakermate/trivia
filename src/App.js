import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home'
import Splash from './components/splash'
import Setup from './components/setup/Setup'
import styled from 'styled-components'
import {BrowserRouter, Route} from 'react-router-dom'
import Game from './components/Game/Game'
import GameOptions from './components/setup/GameOptions'
import splash from './components/splash';


class App extends Component {
  constructor(){
    super()
    this.state={
      location: "/",
      gameInProgress: false,
      config: {

      },
      currentQuestion: 0
    }
    
  }
  //updates current question in root app for tracking progress
  changeGameState(currentQuestion){
    this.setState({currentQuestion: currentQuestion })
  }


  componentDidMount(){
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        {/* temp for testing */}
        {/* <Splash></Splash> */}
        {/* <GameOptions></GameOptions>
        <Game></Game> */}

        {/* temp for testing */}



          <BrowserRouter>
            <Route exact path='/' component={Splash} />
            <Route exact path="/setup" component={GameOptions} />
            <Route path="/game/:question" render={(props)=>
              <Game changeGameState={this.changeGameState} config={this.state.config} />
            } />
          </BrowserRouter>
          
         
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
