import React from 'react'
import styled, {keyframes} from 'styled-components'
import colors from '../../values/colors'

export default function MultipleChoiceButton(props) {
    // both this specific answer and the previous selected answer are passed down as props
    // if selectedAnswer is the same as this buttons answer, render with the .selected class
    if(props.selectedAnswer === props.answer){
        return(
            <MultipleChoiceButtonContainer className="selected" onClick={props.onClick}> 
            {props.answer.toUpperCase()}
        </MultipleChoiceButtonContainer>
        )
    }
    // if it is not the selectedAnswer, render without a .selected class
    else return (
        <MultipleChoiceButtonContainer onClick={props.onClick}> 
            {props.answer.toUpperCase()}
        </MultipleChoiceButtonContainer>
    )
}
const glow = keyframes`
    0%{
        box-shadow: 0px 0px 20px 0 ${colors.glowPrimary};
    }
    50%{
        box-shadow: 0px 0px 30px 10px ${colors.glowPrimary};

    }
    100%{
        box-shadow: 0px 0px 20px 0 ${colors.glowPrimary};

    }
`
const wiggle = keyframes`
    0{
        transform: rotate(0deg)
    }
    25{
        transform: rotate(10deg)
    }
    50{
        transform: rotate(0deg)
    }
    75{
        transform: rotate(-10deg)
    }
    100{
        transform: rotate(0deg)
    }
`

const MultipleChoiceButtonContainer = styled.button`
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
    &.selected{
        background-color: rgba(0,0,0,0);
        transform: scale(1.1);
        box-shadow: 0px 0px 20px #16ebff;
        animation: ${glow} 4s ease-in-out infinite, ${wiggle} 4s ease-in-out infinite;
        font-size: .8rem;
        border-color: ${colors.glowPrimary};
        color: ${colors.primaryLight};
        letter-spacing: 2px;
        text-shadow: 0px 0px 4px ${colors.glowPrimary};
    }
    &:hover{
        outline: none;
    }
    &:active{
        outline: none;
    }
    
    
        

`