import React from 'react'
import styled, {keyframes} from 'styled-components'
import colors from '../../values/colors'

export default function TrueButton(props) {
    return (
        <TrueButtonContainer onClick={props.onClick}>
            TRUE
        </TrueButtonContainer>
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

const TrueButtonContainer = styled.button`
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
        outline:none;
    }
    &:focus{
        outline:none;
    }
    &.selected{
        transform: scale(1.2);
        box-shadow: 0px 0px 20px #16ebff;
        animation: ${glow} 5s linear infinite;
    }
`