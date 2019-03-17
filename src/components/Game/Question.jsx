import React from 'react'
import styled from 'styled-components'

export default class Question extends React.Component{
    constructor(){
        super()
        this.state={
            question: "",
            options: [

            ],
            correctAnswer: "",
            selectedAnswer: ""
        }

    }


    render(){
        return(
            <Question>
                <Title>
                    {this.state.question}
                </Title>
                {/* Container that holds all answers contained in the state from the question objects */}
                <AnswerContainer>
                    {/* map iterates over the list of multiple choice or true/false options and generates an Answer div for each. */}
                    {this.state.options.map(function(answer){
                        return(
                            <Answer>{answer}</Answer>
                        )
                    })}
                </AnswerContainer>
            </Question>
        )
    }
}

// styles

const Question = styled.div`

`
const Title = styled.h2`

`
const AnswerContainer = styled.div`
`
const Answer = styled.div`
`