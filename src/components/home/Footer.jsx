import React from 'react'
import styled from 'styled-components'

export default function Footer() {
    return (
        <Footer>
            <Content>
                Jake Miller &copy;
            </Content>
        </Footer>
  )
}

const Footer = styled.div`
    height: 100px;
    padding: 1rem 2rem;
`

const Content = styled.div`
    margin: 0 auto;
    max-width: 500px;

 `

 const Copyright = styled.div`
 
 `