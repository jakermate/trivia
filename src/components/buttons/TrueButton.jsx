import React from 'react'
import styled from 'styled-components'

export default function TrueButton() {
    return (
        <TrueButtonContainer>
            TRUE
        </TrueButtonContainer>
  )
}

const TrueButtonContainer = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: #4cf788;
    border: 2px solid white;
    box-shadow: 2px 2px 4px #999;
    color: white;
    text-align: center;
    font-size: .7rem;
    font-weight: bold;
`