import React, { Component } from 'react'
import styled from 'styled-components'
import colors from '../../values/colors'

export default class SubmitButton extends Component {
    render(props) {
        if(this.props.isActive){
            return (
                <SubmitButtonContainer className="active" onClick={this.props.onClick}>
                    SUBMIT
                </SubmitButtonContainer>
            )
        }
        else{
            return(

                <SubmitButtonContainer className="inactive" onClick={this.props.onClick}>
                    SUBMIT
                </SubmitButtonContainer>
            )
        }
        
    }
}

const SubmitButtonContainer = styled.button`
    width:50%;
    border-style: none;
    text-align: center;
    right: 0;
    height:100%;
    background: rgba(0,0,0,0.11);
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