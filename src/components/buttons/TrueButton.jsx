import React from 'react'
import styled from 'styled-components'

export default function TrueButton(props) {
    return (
        <TrueButtonContainer onClick={props.onClick}>
            TRUE
        </TrueButtonContainer>
  )
}

const TrueButtonContainer = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: #fafafa;
    box-shadow: 2px 2px 4px #999;
    color: black;
    border-style: none;
    text-align: center;
    font-size: .7rem;
    font-weight: bold;
    transition: .3s ease-out;

    &:hover{
        outline: none;
    }
    &:active{
        outline:none;
    }
    &:focus{
        outline:none;
    }
    &.selected{
        transform: scale(1.2);
        box-shadow: 0px 0px 20px #16ebff;

    }
`