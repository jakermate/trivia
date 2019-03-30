import React from 'react'
import styled from 'styled-components'

export default function MultipleChoiceButton(props) {
    return (
        <MultipleChoiceButtonContainer onClick={this.onClick}> 
            {this.props.answer}
        </MultipleChoiceButtonContainer>
    )
}

const MultipleChoiceButtonContainer = styled.button`

`