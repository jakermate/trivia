import React from 'react'
import styled, {keyframes} from 'styled-components'

export default function MultipleChoiceButton(props) {
    // both this specific answer and the previous selected answer are passed down as props
    // if selectedAnswer is the same as this buttons answer, render with the .selected class
    if(props.selectedAnswer === props.answer){
        return(
            <MultipleChoiceButtonContainer className="selected" onClick={props.onClick}> 
            {props.answer}
        </MultipleChoiceButtonContainer>
        )
    }
    // if it is not the selectedAnswer, render without a .selected class
    else return (
        <MultipleChoiceButtonContainer onClick={props.onClick}> 
            {props.answer}
        </MultipleChoiceButtonContainer>
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
    width: 100px;
    height: 100px;
    margin: 1rem 1rem;
    border-radius: 100px;
    background-color: #fafafa;
    box-shadow: 2px 2px 4px rgba(0,0,0,.3), 0 0 12px rgba(30,30,30,.4);
    color: black;
    border: 5px solid black;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0,0,0,.2);
    font-size: .6rem;
    font-weight: bold;
    overflow: visible;
    transition: .3s ease-out;
    &.selected{
        background-color: white;
        transform: scale(1.2);
        box-shadow: 0px 0px 20px #16ebff;
        animation: ${glow} 4s ease-in-out infinite, ${wiggle} 4s ease-in-out infinite;
        font-size: .8rem;
        letter-spacing: 2px;
        text-shadow: 2px 2px 2px rgba(0,0,0,.3), 0 0 9px rgba(0,0,0,.2);
    }
    &:hover{
        outline: none;
    }
    &:active{
        outline: none;
    }
    
    
        

`