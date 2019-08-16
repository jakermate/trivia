import React from 'react'
import GameOptions from '../setup/GameOptions'
import {Link, withRouter} from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../values/colors'
import Footer from './Footer'
import { Doughnut } from 'react-chartjs-2';

export default class Home extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(props){
        
    }
    render(){
        return(
            <HomePage id="home-page">
                <Header></Header>
                <Splash>
                    <Title id="home-title">
                        BRAIN SPACE               
                    </Title>
                    <Subtitle>
                        TRIVIA CHALLENGE
                    </Subtitle>
                    <Welcome>
                        Welcome back <br></br> {this.props.user.profile.name}
                    </Welcome>
                </Splash>
                <Navigation>
                    <NavLink to="/setup">
                            PLAY
                    </NavLink>
                    <NavLink to="/profile">
                            PROFILE
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
    color: ${colors.primaryLight};
    background: linear-gradient(-134deg, ${colors.gradOne} 0%, ${colors.gradTwo} 37%, ${colors.gradThree} 100%);
`
const Title = styled.h1`
    margin: 2rem auto 0 auto;
    font-family: LucidaGrande;
    font-size: 16px;
    letter-spacing: 8.44px;
    text-align: center;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.50);
`
const Subtitle = styled.h4`
    margin: 0;
    font-family: LucidaGrande;
    font-size: 10px;
    letter-spacing: 8.44px;
    text-align: center;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.50);
`
const Header = styled.div`

`

const Splash = styled.div`
    padding: 1rem;
    width: 100%;
    height: 200px;
    box-sizing: border-box;
`

const Welcome = styled.div`
    width:80%;
    margin: 2rem auto;
`
const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NavLink = styled(Link)`
    width: 80%;
    height: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-decoration: none;
    color: ${colors.primaryLight};
    margin: .5rem auto;
    text-align: center;
    font-size: .8rem;
    letter-spacing: 6px;
    overflow: visible;
    transition: .3s ease-out;
    background: linear-gradient(to bottom, rgba(255,255,255,.1), rgba(255,255,255,0));
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

