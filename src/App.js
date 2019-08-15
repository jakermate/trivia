import React, { Component } from 'react';
import styles from './css/App.module.css'
import Home from './components/home/Home'
import Splash from './components/splash'
import Setup from './components/setup/Setup'
import styled from 'styled-components'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import Game from './components/Game/Game'
import GameOptions from './components/setup/GameOptions'
import Cookies from 'js-cookie'
import Results from './components/Game/Results'
import '../src/css/spinner.css' 
import uuidv1 from 'uuid' // unique id generation
import {Transition} from 'react-transition-group'
import Profile from './components/profile/Profile'
import history from './history'
// import Provider from 'react-redux'
// import store from './redux/store'



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
      this.setState({config: configObject}, ()=>{
        
      })
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
    let currentCookies = Cookies.getJSON()
    console.log(currentCookies)
    if(currentCookies.user.profile.id !== undefined){
      // if cookies exist, set into App state
      console.log('Welcome back. Cookies :'+ JSON.stringify(currentCookies))
      // set user profile cookies as string into state-> cookies
      this.setState({cookies: currentCookies}, () =>{
        this.setState({user: currentCookies.user}, ()=> console.log(this.state.user)) // set cookies parsed as object into user state
      } )
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
        lastvisit: date,
        name: 'newUser',
        firstVisit: true
      },
      scores: [

      ]
    }},()=>{
      Cookies.set('user', this.state.user, {expires: 30})
      console.log("New user information generated: "+ JSON.stringify(Cookies.get()))
    })
    
  }

  // generate and return unique user id
  generateID = () => uuidv1()

  // set username
  setName = (name) => {
    let newUserData = this.state.user
    newUserData.profile.name = name
    this.setState({user: newUserData},()=>{
      this.setCookies() // builds new user object and sets new cookie
    })
  }

  // gamesplayed
  gamesPlayed = () => {
    let newUserData = this.state.user
    if(newUserData.profile.gamesPlayed === undefined){
      newUserData.profile.gamesPlayed = 1
    }
    else{
      newUserData.profile.gamesPlayed += 1
    }
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
  // results and score methods
  moveToResults = () => {

  }

  // scores
  appendNewScore = (newScoreObject) => {
    let newScoreArray = this.state.user.scores
    newScoreArray.push(newScoreObject)
    // check if score array is 10 or more
    if (newScoreArray.length >= 10){
      newScoreArray.shift()
    }
    let updatedUserState = this.state.user
    updatedUserState.scores = newScoreArray // update user object with new score array
    this.setState({user: updatedUserState}, ()=>{
      console.log('User state updated: '+this.state.user)
    }) // set new user object to app state
  }
  firstVisit = () => {
    console.log("first visit")
  }
  render() {
    return (
      <AppContainer className={`${styles.container}`}>
        {/* temp for testing */}
        {/* <Splash></Splash> */}
        {/* <GameOptions></GameOptions>
        <Game></Game> */}

        {/* temp for testing */}



          <BrowserRouter history={history}>
            <Route exact path='/' render={(props)=>
              <Splash user={this.state.user}></Splash>
            } />
            <Route exact path='/home' render={(props)=>{
              return <Home user={this.state.user} firstVisit={this.firstVisit}></Home>
            }}
            
            />
            <Route exact path="/setup" render={(props)=>
              <GameOptions history={this.history} receiveConfig={this.receiveConfig} />
            } />
            <Route path="/game" render={(props)=>
              <Game  user={this.state.user} config={this.state.config} changeGameState={this.changeGameState}/>
            } />
            <Route path="/results" render={(props)=>
              <Results  user={this.state.user} />
            } />
            <Route path="/profile" render={(props)=>
              <Profile changeName={this.setName} setName={this.setName} profile={this.state.user.profile} scores={this.state.user.scores} ></Profile>
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
      </AppContainer>
    );
  }
}

export default App;


const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`
