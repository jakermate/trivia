import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import questionmark from '../img/questionmark.png'
import logo from '../img/splash-logo.svg'
import logoAlt from '../img/brain-space-alt.svg'
import {Link, withRouter} from 'react-router-dom'
import colors from '../values/colors'


class splash extends Component{
 
    constructor(props){
        super(props)
        this.state = {
            title: "BRAIN SPACE"
        }
        
    }


    componentDidMount(){
    }
    componentWillReceiveProps(){
        // if user has prior games played, push to home screen
            if(this.props.user.scores.length > 0){
                this.props.history.push('/home')
            }

       
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

            <ParticleContainer id="particles">
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
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
// holds particles
const ParticleContainer = styled.div`
    position: absolute;
    top: 0;
    left:0;
    right: 0;
    bottom: 0;
`
const fall = keyframes`
    0%{
        transform: translate(0,0);
    }
    100%{
        transform: translate(0, 120vh);
    }
`
const strobe = keyframes`
    0%{
        height: 32px;
    }
    50%{
        height: 25px;
    }
    100%{
        height: 32px;
    }
`
const Star = styled.div`
    width: 2px;
    position: absolute;
    filter: drop-shadow(0 0 4px ${colors.primaryLightest});
    background: linear-gradient(to bottom,rgba(255,255,255,0), rgba(255,255,255,.9));
    left: 50%;
    top: -5%;
    animation: ${fall} 14s linear infinite, ${strobe} 6s ease-in-out infinite;
    :nth-child(2){
        left: 10%;
        top: -5%;
        animation-delay: 2600ms;
    }
    :nth-child(3){
        left: 33%;
        top: -5%;
        animation-delay: 4600ms;
    }
    :nth-child(4){
        left: 95%;
        top: -5%;
        animation-delay: 5300ms;
    }
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
    background: linear-gradient(to bottom, ${colors.gradOne}, ${colors.gradTwo}, ${colors.gradThree} );

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

export default withRouter(splash) 