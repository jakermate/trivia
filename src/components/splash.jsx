import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import questionmark from '../img/questionmark.png'
import logo from '../img/splash-logo.svg'
import logoAlt from '../img/brain-space-alt.svg'
import {Link} from 'react-router-dom'
import colors from '../values/colors'


export default class splash extends Component{
 
    constructor(props){
        super(props)
        this.state = {
            title: "BRAIN SPACE"
        }
        this.config = "configs/particlesjs-config.json"
        
    }


    componentDidMount(){
       this.initiateParticles()
    }
    // interval for pawing/despawning randomized particle divs 
    initiateParticles(){  
        let count = 1
        this.intervalFunction = setInterval(function(){

            // randomized number to determine starting position of new particle


            // add new particle
            document.getElementById('background-particles').innerHTML += `<Particle id="particle-${count}"><Particle/>`
            //remove old particle
            if(count > 2){
                document.getElementById(`particle-${count-2}`).remove()

            }


            count += 1
        },4000)
    }
    getStarted(){
        // triggered when get started button is clicked, leads into game setup
        console.log("Moving onto game setup...")
        this.props.beginSetup()
    }
    componentWillUnmount(){
        // clear interval function
        clearInterval(this.intervalFunction)
    }

    render() {
        return (
        <SplashContainer>
            <Background>
                <ParticleContainer id="background-particles">
                    <Particle></Particle>
                </ParticleContainer>
                <BackgroundOverlay>
                    <Header>

                        <SplashImage src={logo} className="App-logo" alt="logo" />
                        <TitleContainer>
                            {this.state.title}
                        </TitleContainer>
                        {/* <Subtitle>
                            A Game of Trivia
                        </Subtitle> */}
                    </Header>
                    <StartContainer>
                        <Link to="/home">
                            <StartSpan>PLAY</StartSpan>
                        </Link>

                    </StartContainer>
                    
                </BackgroundOverlay>
            </Background>
        </SplashContainer>
        )
    }
}

// keyframes
const logoanime = keyframes`
    0%{
        transform: scale(1);
        
    }
    50%{
        transform: scale(1.2)
    }
    100%{
        transform: scale(1)
    }
`
const titleanime = keyframes`
    0%{
        letter-spacing:.3rem;
        font-size: .4rem

        
    }
    100%{
        letter-spacing:8.4px;
        font-size: 1rem

    }
`
const particleAnime = keyframes`
    from{
        transform: translate(0px, 0px)
    }
    to{
        transform: translate(100vw, 100vh)
    }
`


const SplashContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

`
const SplashImage = styled.img`
    height: 90px;
    animation: ${logoanime} 8s ease-in-out infinite;

`
const Particle = styled.div`
    position: relative;
    width:2px;
    height:2px;
    background-color: white;
    animation: ${particleAnime} 4s linear;
    border-radius:4px;
`
// holds particles
const ParticleContainer = styled.div`
    position: absolute;
    top: 0;
    left:0;
    right: 0;
    bottom: 0;
`


const Background = styled.div`
    background-color: #222222;
    width: 100%;
    height: 100%;
    background-size: 10%;
    
`
const BackgroundOverlay = styled.div`
    width:100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10rem 1rem;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    background: linear-gradient(to bottom, ${colors.backgroundPrimary}, ${colors.backgroundSecondary} );

`
const StartContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 4rem;
    box-sizing: border-box;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    right: 0;
`

const StartButton = styled.button`
    border-radius: 10px;
    padding: .6rem 1.4rem;
    font-weight: bold;
    color: ${colors.primaryLight};
    font-size: 1rem;
    background-color: rgba(0,0,0,0);
`
const TitleContainer = styled.div`
    font-size: 1rem;
    margin-top: 2rem;
    position:relative;
    right: -.5rem;
    text-transform: uppercase;
    animation: ${titleanime} 4s ease-in-out;

    font-family: LucidaGrande;
    color: ${colors.primaryLight};
    letter-spacing: 8.44px;
    text-align: center;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.50), 0 0 7px rgba(0, 213,172,.66);
    

`
const StartSpan = styled.span`
    color: ${colors.primaryLight};
    font-size: 1rem;
    letter-spacing: 4px;
`

const Header = styled.div`
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Subtitle = styled.h4`

`
const Particles = styled.div`
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
`