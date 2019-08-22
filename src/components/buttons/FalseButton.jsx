import React from 'react'
import styled, {keyframes} from 'styled-components'
import colors from '../../values/colors'

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
    width: 80%;
    height: 3rem;
    margin: .5rem auto;
    border-radius: 6px;
    background: rgba(0,0,0,0);
    color: ${colors.greyedOut};
    border: 1px solid rgba(0,0,0,0);
    text-align: center;
    background: rgba(0,0,0,.3);
    font-size: .6rem;
    overflow: visible;
    transition: .3s ease-out;
    box-shadow: 2px 2px 8px rgba(0,0,0,.3);
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