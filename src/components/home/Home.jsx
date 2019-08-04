import React from 'react'
import GameOptions from '../setup/GameOptions'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../values/colors'
import Footer from './Footer'

export default class Home extends React.Component{
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

                </Splash>
                <Navigation>
                    <Link to="/setup" style={{color: 'white'}}>
                        <NavButton>
                            PLAY
                        </NavButton>
                    </Link>
                    <Link to="/profile" style={{color: 'white'}}>
                        <NavButton>
                            PROFILE
                        </NavButton>
                    </Link>
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
    background: linear-gradient(-134deg, ${colors.backgroundPrimary} 0%, ${colors.backgroundSecondary} 37%, ${colors.backgroundThird} 100%);
`
const Title = styled.h1`
    margin: 0;
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

const Navigation = styled.div`
    display: flex;
    flex-direction: column;
`

const NavButton = styled.button`
    width: 80%;
    height: 3rem;
    margin: .5rem auto;
    border: 1px solid ${colors.greyedOut};
    text-align: center;
    font-size: .6rem;
    overflow: visible;
    transition: .3s ease-out;
    background: rgba(0,0,0,0.11);
    border-radius: 2px;
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
