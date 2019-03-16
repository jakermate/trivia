import React, { Component } from 'react'
import styled from 'styled-components'
import questionmark from '../img/questionmark.png'

export default class splash extends Component {
 

  render() {
    return (
      <SplashContainer>
        <Background>
            <TitleContainer>
                Legit Trivia
            </TitleContainer>

            <StartButton>
                Get Started
            </StartButton>

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
    
`
const TitleContainer = styled.div`
    font-size: 2rem;

`
