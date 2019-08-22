import React from 'react'
import GameOptions from '../setup/GameOptions'
import {Link, withRouter} from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../values/colors'
import Footer from './Footer'
import { Doughnut } from 'react-chartjs-2';
import background from '../../img/splash-logo.svg'

export default class Home extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(props){
        
    }
    render(){
        return(
            <HomePage id="home-page">
                <Header>
                    <HeaderTitle>BRAIN SPACE</HeaderTitle>
                </Header>
                <Splash>
                    <Img src={background} alt=""/>
                    <Title id="home-title">
                         BRAIN SPACE               
                    </Title>
                    <Subtitle>
                        TRIVIA CHALLENGE
                    </Subtitle>
                    {this.props.user.profile.name && 
                    <Welcome>
                        WELCOME BACK <br></br> {this.props.user.profile.name}
                    </Welcome>}
                </Splash>
                <Navigation>
                    <NavLink to="/setup">
                            PLAY
                    </NavLink>
                    <NavLink to="/profile">
                            PROFILE
                    </NavLink>
                    <NavLink to="/about">
                            ABOUT
                    </NavLink>
                </Navigation>

                <Footer></Footer>
            </HomePage>
        )
    }
}
const HomePage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: ${colors.primaryLight};
    background: linear-gradient(-134deg, ${colors.gradOne} 0%, ${colors.gradTwo} 37%, ${colors.gradThree} 100%);
`
const Img = styled.img`
    width: 50px;
    margin-top:1rem;
`
const Title = styled.h2`
    margin: 2rem auto 0 auto;
    font-size: 1.2rem;
    font-weight: lighter;
    padding-left:1rem;
    letter-spacing: 1rem;
    text-align: center;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.50);
`
const Subtitle = styled.h4`
    margin: 0;
    font-size: 10px;
    font-weight: lighter;
    letter-spacing: 8.44px;
    text-align: center;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.50);
`
const Header = styled.div`
    width: 100%;
    height: 88px;
    box-shadow: 0 0 16px rgba(0,0,0,.2), 0 4px 8px rgba(0,0,0,.3);
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const HeaderTitle = styled.div`
    font-size: 11px;
    color: black;
    letter-spacing: 5.09px;
    text-align: center;
    position: absolute;
    left:0;
    z-index:0;
    right: 0;
`
const Splash = styled.div`
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 200px;
    box-sizing: border-box;
`

const Welcome = styled.div`
    width:80%;
    font-size: .6rem;
    text-align: center;
    margin: 1rem auto;
`
const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NavLink = styled(Link)`
    width: 80%;
    height: 3rem;
    max-width: 300px;
    display: flex;
    font-weight: lighter;
    flex-direction: column;
    justify-content: space-around;
    text-decoration: none;
    color: ${colors.primaryLight};
    margin: .5rem auto;
    text-align: center;
    font-size: .8rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,1);
    letter-spacing: 6px;
    overflow: visible;
    transition: .3s ease-out;
    background: linear-gradient(330deg, rgba(255,255,255,.3), rgba(255,255,255,0));
    box-shadow: 4px 4px 8px rgba(0,0,0,.3), 0 0 20px rgba(0,0,0,.2);
    &.selected{
        background-color: rgba(0,0,0,0);
        transform: scale(1.1);
        box-shadow: 0px 0px 20px #16ebff;
        font-size: .8rem;
        border-color: ${colors.glowPrimary};
        color: ${colors.primaryLight};
        letter-spacing: 2px;
        text-shadow: 0px 0px 4px ${colors.glowPrimary};
    }
    &:hover{
        outline: none;
    }
    &:active{
        outline: none;
    }
`

