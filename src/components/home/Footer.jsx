import React from 'react'
import styled from 'styled-components'
import logo from '../../img/setup-logo.svg'
import colors from '../../values/colors'

export default function Footer() {
    return (
        <FooterContainer>
            <Content>
                <LogoContainer>
                    <img height="40" src={logo} alt=""/>
                </LogoContainer>
                <Copyright>
                    JAKE MILLER &copy;2019
                </Copyright>
            </Content>
        </FooterContainer>
  )
}

const FooterContainer = styled.div`
    height: 100px;
    padding: 1rem 2rem;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom:0;
    left: 0;
    right: 0;
    box-shadow: 0 -4px 16px rgba(0,0,0,.3);
    background: rgba(0,0,0,0.11);
`

const LogoContainer = styled.div`
    height: 60px;
`


const Content = styled.div`
    margin: 0 auto;
    max-width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

 `

 const Copyright = styled.div`
    color: ${colors.secondaryLight};
    font-size: .3rem;
 `