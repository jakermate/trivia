import React from 'react'
import styled, {keyframes} from 'styled-components'

export default function FalseButton(props) {
    return (
        <FalseButtonContainer onClick={props.onClick}>
            FALSE
        </FalseButtonContainer>
  )
}

const glow = keyframes`
    0%{
        box-shadow: 0px 0px 20px 0 #16ebffaa;
    }
    50%{
        box-shadow: 0px 0px 30px 10px #16ebff;
    }
    100%{
        box-shadow: 0px 0px 20px 0 #16ebffaa;
    }
`

const FalseButtonContainer = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: #222222;
    box-shadow: 2px 2px 4px #999;
    border-style: none;
    color: white;
    text-align: center;
    font-size: .7rem;
    font-weight: bold;
    transition: .3s ease-out;
    &:hover{
        outline: none;
    }
    &:active{
        outline:none
    }
    &:focus{
        outline:none;
    }
    &.selected{
        transform: scale(1.2);
        box-shadow: 0px 0px 20px #16ebff;
        &::after{
        width: 60px;
        height: 60px;
        border-radius: 60px;
        background-color: rgba(0,0,0,0);
        box-shadow: 0 0 30px red;
        animation: ${glow} 5s linear infinite;
    }
    }
    
`