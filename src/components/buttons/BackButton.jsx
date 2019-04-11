import React from 'react'
import styled from 'styled-components'
import colors from '../../values/colors'

export default function BackButton(props) {
    if(props.isActive){
        return (
            <BackButtonContainer className="active" onClick={props.onClick}>
                BACK
            </BackButtonContainer>
        )
    }
    else{
        return(
            <BackButtonContainer className="inactive" onClick={props.onClick}>
                BACK
            </BackButtonContainer>
        )
    }
    
}
const BackButtonContainer = styled.button`
    width:50%;
    border: none;
    background: rgba(0,0,0,0.11);
    text-shadow: 2px 2px 4px rgba(0,0,0,.5);
    text-align: center;
    color: ${colors.greyedOut};
    font-size: .7rem;
    font-weight: bold;
    &:hover{
        outline: none;
    }
    &:active{
        outline:none
    }
    &:focus{
        outline:none;
    }
    &.inactive{
        color: ${colors.greyedOut};
    }
    &.active{
        color: ${colors.secondaryLight}
    }

`