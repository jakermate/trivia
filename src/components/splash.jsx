import React, { Component } from 'react'
import styled from 'styled-components'
import questionmark from '../img/questionmark.png'
import logo from '../img/headless-logo.png'
import {Link} from 'react-router-dom'

export default class splash extends Component{
 
    getStarted(){
        // triggered when get started button is clicked, leads into game setup
        console.log("Moving onto game setup...")
        this.props.beginSetup()
    }

    render() {
        return (
        <SplashContainer>
            <Background>
                <Header>

                    <img src={logo} className="App-logo" alt="logo" />
                    <TitleContainer>
                        MIND ASSAULT
                    </TitleContainer>
                    <Subtitle>
                        A Game of Trivia
                    </Subtitle>
                </Header>
                <Link to="/setup">
                    START
                </Link>

            </Background>
        </SplashContainer>
        )
    }
}

const SplashContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

const Background = styled.div`
    /* background-image: url(${questionmark}); */
    background-repeat: repeat;
    width: 100%;
    height: 100%;
    background-size: 10%;
    
`
const StartButton = styled.button`
    border-radius: 10px;
    padding: .6rem 1.4rem;
    font-weight: bold;
    color: white;
    font-size: 1rem;
    background-color: rgba(0,0,0,0)
`
const TitleContainer = styled.div`
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 4px 4px 4px black;

`
const Header = styled.div`

`
const Subtitle = styled.h4`

`