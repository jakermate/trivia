import React, { Component } from 'react';
import styles from './css/App.module.css'
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
import uuidv1 from 'uuid' // unique id generation
import {Transition} from 'react-transition-group'
import Profile from './components/profile/Profile'


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

        ],
        profile:{

        }
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
    this.checkForCookies()
  }

  // cookies
  buildCookieModel(){
    let newCookie = {
      profile: this.state.user.profile,
      scores: this.state.user.scores
    }
    return newCookie
  }

  checkForCookies(){
    let currentCookies = Cookies.get()
    console.log(currentCookies)
    if(currentCookies.id !== undefined){
      // if cookies exist, set into App state
      console.log('Welcome back. Cookies :'+ JSON.stringify(currentCookies))
      this.setState({cookies: currentCookies})
    }
    else{
      console.log("No existing cookie data.  New profile created.")
      // call for creation of new user data
      this.firstVisitCookie();
      
    }
  }
  setCookies(){
    // create new user info object
    Cookies.set("user", this.buildCookieModel(), {expires: 30})
  }

  // set basic cookie on first visit
  firstVisitCookie(){
    let date = new Date()
    // sets recent visit date/time and user id to expire in 30 days
    this.setState({user: {
      profile:{
        id: this.generateID(),
        lastvisit: date
      },
      scores: [

      ]
    }},()=>{
      Cookies.set('user', this.state.user, {expires: 30})
      console.log("New user information generated: "+ JSON.stringify(Cookies.get()))
    })
    
  }

  // generate and return unique user id
  generateID(){
    return uuidv1();
  }

  // end of game/ results
  receiveNewScore(score){
    if(score !== undefined | null){
      //store current user state in new variable
      let userUpdate = this.state.user
      // modify user variable with new score
      userUpdate.scores.push(score)
      if(userUpdate.scores.length >= 10){ // keep recent scores length to ten and under
        userUpdate.scores.shift()
      }
      // update state with updated user information
      this.setState({user: userUpdate}, function(){
        console.log("User state successfully updated with new score: " + score)
      })
    }
  }

  render() {
    return (
      <div className={`${styles.container}`}>
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
            <Route path="/profile" render={(props)=>
              <Profile></Profile>
            }

            />
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
