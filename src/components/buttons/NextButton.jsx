import React, { Component } from 'react'
import styled from 'styled-components'
import colors from '../../values/colors'

export default class NextButton extends Component {
    render(props) {
        if(this.props.isActive){
            return (
                <NextButtonContainer className="active" onClick={this.props.onClick}>
                    NEXT
                </NextButtonContainer>
            )
        }
        else{
            return(

                <NextButtonContainer className="inactive" onClick={this.props.onClick}>
                    NEXT
                </NextButtonContainer>
            )
        }
        
    }
}

const NextButtonContainer = styled.button`
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