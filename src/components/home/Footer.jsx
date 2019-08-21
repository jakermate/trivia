import React from 'react'
import styled from 'styled-components'
import logo from '../../img/logo-bg.svg'
import colors from '../../values/colors'

export default function Footer() {
    return (
        <FooterContainer>
            <Content>
                {/* <LogoContainer>
                    <img height="40" src={logo} alt=""/>
                </LogoContainer> */}
                <Copyright>
                    JAKE MILLER &copy;2019
                </Copyright>
            </Content>
        </FooterContainer>
  )
}

const FooterContainer = styled.div`
    height: 80px;
    padding: 1rem 2rem;
    width: 100%;
    box-sizing: border-box;
    position: absolute;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    bottom:0;
    left: 0;
    right: 0;
    box-shadow: 0 -4px 16px rgba(0,0,0,.3);
    background: linear-gradient(45deg, ${colors.primaryDark}, rgba(50,50,50,.4));
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
    color: black;
    font-size: .3rem;
 `