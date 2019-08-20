import React, { Component } from 'react'
import styled from 'styled-components'
import colors from '../../values/colors'
import Header from '../setup/Header'

export default class About extends Component {
    render() {
        return (
            <AboutComponent>
                <Header></Header>
                <AboutContent id="about-content">
                    <AboutLeader>ABOUT</AboutLeader>
                    <AboutPara>Brain Space is a trivia application built on top of the Open Trivia Database.
                        This project is ReactJS based.
                    </AboutPara>
                </AboutContent>
            </AboutComponent>
        )
    }
}

const AboutComponent = styled.div`
    width: 100%;
    height: 100%;
    color: ${colors.primaryLight};
    background: linear-gradient(to bottom, ${colors.gradTwo}, ${colors.backgroundThird}, ${colors.gradOne});
`
const AboutContent = styled.div`
    height: 100%;
    max-width: 1200px;
    padding: 1rem;
`
const AboutLeader = styled.h2`

    font-weight: lighter;
    letter-spacing: 10px;
`
const AboutPara = styled.p`
    text-transform: uppercase;
`