import React, { Component } from 'react'
import styled from 'styled-components'

export default class NextButton extends Component {
    render(props) {
        return (
            <NextButtonContainer onClick={this.props.onClick}>
                NEXT
            </NextButtonContainer>
        )
    }
}

const NextButtonContainer = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: #4cf788;
    border-style: none;
    box-shadow: 2px 2px 4px #999;
    color: white;
    text-align: center;
    position: absolute;
    right: 0;
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

`