import React from 'react'
import styled from 'styled-components'

export default class Question extends React.Component{
    constructor(props){
        super(props)
        this.state={
            question: {

            },
            options: [

            ],
            correctAnswer: "",
            selectedAnswer: ""
        }

    }

    componentDidMount(){
        // set question into state when received as prop
        this.setState({question: this.props.question})
    }

    render(){
        let component
        // conditional rendering based upon question type
        if(this.state.question.type === "multiple"){
            component = (
                <QuestionContainer>
                    <Title>
                        {this.props.question.questionString}
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
                </QuestionContainer>
            )
        }
        if(this.state.question.type === "boolean"){
            component = (
                <QuestionContainer>
                    <Title>
                        {this.props.question.questionString}
                    </Title>
                    <AnswerContainer>
                        <Answer>True</Answer>
                        <Answer>False</Answer>
                    </AnswerContainer>
                </QuestionContainer>
            )
        }

        return(
            // component variable should contain one of the two question container types defined above
            {component}
        )
    }
}

// styles

const QuestionContainer = styled.div`

`
const Title = styled.h2`

`
const AnswerContainer = styled.div`
`
const Answer = styled.div`
`