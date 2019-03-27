import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home'
import Splash from './components/splash'
import Setup from './components/setup/Setup'
import styled from 'styled-components'
import {BrowserRouter, Route} from 'react-router-dom'
import Game from './components/Game/Game'
import GameOptions from './components/setup/GameOptions'
import Cookies from 'js-cookie'
import Results from './components/Game/Results'
import '../src/css/spinner.css'


class App extends Component {
  constructor(){
    super()
    this.state={
      location: "/",
      gameInProgress: false,
      config: {

      },
      currentQuestion: 0,
      cookies:{

      },
      user:{
        scores:[

        ]
      }
    }
    this.receiveConfig = this.receiveConfig.bind(this)
    
  }
  // color object storing values to be swapped out for backgriund overlay gradient
  colors = {
    blue: "#28f1fc77",
    yellow: "#E4DE7F77"
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
 
  // runs when App component mounts (first page visit)
  componentDidMount(){
    //call to check for previous visits through cookies
    this.firstVisitCookie()
  }

  // cookies
  checkForCookies(){
    let currentCookies = Cookies.get()
   
    if(currentCookies !== undefined){
      // if cookies exist, set into App state
      console.log('Welcome back. Cookies :'+ currentCookies)
      this.setState({cookies: currentCookies})
      Cookies.set(currentCookies,)
    }
    else if (!currentCookies){
      console.log("No existing cookie data.  New profile created.")
    }
    
  }
  // set basic cookie on first visit
  firstVisitCookie(){
    let date = new Date()
    Cookies.set('lastvisit', date, {expires: 30})
  }

  

  // end of game/ results
  receiveNewScore(score){
    if(score !== undefined | null){
      //store current user state in new variable
      let userUpdate = this.state.user
      // modify user variable with new score
      userUpdate.scores.push(score)
      // update state with updated user information
      this.setState({user: userUpdate}, function(){
        console.log("User state successfully updated with new score: " + score)
      })
    }
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
            <Route path="/game" render={(props)=>
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
