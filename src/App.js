import React, { Component } from 'react';
import logo from './img/jackiechan.jpg';
import './App.css';
import Home from './components/home/Home'
import Splash from './components/splash'
import Setup from './components/Setup'
import styled from 'styled-components'
import {BrowserRouter, Route} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Route exact path='/' component={Home} />
            <Route exact path="/setup" component={Setup} />
            <Route path="/game" component={Game} />
          </BrowserRouter>
          <img src={logo} className="App-logo" alt="logo" />
          <Splash />
          <Home />
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
