import React from 'react'
import styled from 'styled-components'
import logo from '../../img/shield.png'

export default function Footer() {
    return (
        <FooterContainer>
            <Content>
                <LogoContainer>
                    <img height="100" src={logo} alt=""/>
                </LogoContainer>
                <Copyright>
                    Jake Miller &copy;
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
`

const LogoContainer = styled.div`
    height: 60px;
`


const Content = styled.div`
    margin: 0 auto;
    max-width: 500px;

 `

 const Copyright = styled.div`
 
 `