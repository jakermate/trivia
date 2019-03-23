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
    this.receiveConfig = this.receiveConfig.bind(this)
    
  }
  //updates current question in root app for tracking progress
  changeGameState(currentQuestion){
    this.setState({currentQuestion: currentQuestion })
  }

  // receives config object from gameOptions component and sets into gameconfig state
  receiveConfig(configObject){
    if (configObject !== undefined){
      console.log('Valid configuration received=> '+ JSON.stringify(configObject))
      this.setState({config: configObject})
    }
    else{
      console.log("Config got messed up somewhere...")
    }
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        {/* temp for testing */}
        {/* <Splash></Splash> */}
        {/* <GameOptions></GameOptions>
        <Game></Game> */}

        {/* temp for testing */}



          <BrowserRouter>
            <Route exact path='/' component={Splash} />
            <Route exact path="/setup" render={(props)=>
              <GameOptions receiveConfig={this.receiveConfig} />
            } />
            <Route path="/game/:question" render={(props)=>
              <Game changeGameState={this.changeGameState}/>
            } />
          </BrowserRouter>
          
         
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
      </div>
    );
  }
}

export default App;
