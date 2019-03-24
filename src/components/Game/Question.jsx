import React from 'react'
import styled from 'styled-components'
import he from 'he' // html decoding

export default class Question extends React.Component{
    constructor(props){
        super(props)
        this.state={
            question: {

            }
        }
        this.updateAnswer = this.updateAnswer.bind(this)
    }

    // update the Answer property in the game object in state
    updateAnswer(e){
        let newQuestion = this.state.question
        newQuestion.selectedAnswer = e.target.innerHTML
        this.setState({question: newQuestion}, function(){
            console.log("Question answered as: "+ this.state.question.selectedAnswer+" and stored in state.")
            // now call pushQuestionUpdate to push update to Game components state array
            this.pushQuestionUpdate(this.state.question)
        })

    }

    // this pushes question with updated answers back up into question array in the Game component
    pushQuestionUpdate(newQuestion){
        this.props.pushToGameState(newQuestion)
    }

    componentDidMount(){
        // set question into state when received as prop
        this.setState({question: this.props.question}, function(){
            console.log("Question set to state: " + JSON.stringify(this.state.question))
        })
    }

    render(){
        let component
        // conditional rendering based upon question type
        if(this.state.question.type === "multiple"){
            component = 
                (<QuestionContainer>
                    <Title>
                        {this.state.question.questionString}
                    </Title>
                    {/* Container that holds all answers contained in the state from the question objects */}
                    <AnswerContainer>
                        {/* map iterates over the list of multiple choice or true/false options and generates an Answer div for each. */}
                        {this.state.question.answers.map(function(answer){
                            return(
                                <Answer onClick={this.updateAnswer}>{answer}</Answer>
                            )
                        })}
                    </AnswerContainer>
                </QuestionContainer>)
            
        }
        if(this.state.question.type === "boolean"){
            component = (
                <QuestionContainer>
                    <Title>
                        {this.state.question.questionString}
                    </Title>
                    <AnswerContainer>
                        <Answer onClick={this.updateAnswer}>True</Answer>
                        <Answer onClick={this.updateAnswer}>False</Answer>
                    </AnswerContainer>
                </QuestionContainer>)
            
        }
        else{
            component = (<h1>ERROR</h1>)
        }
        return(
            // component variable should contain one of the two question container types defined above
            
            <div id="question-component-wrapper">{component}</div>
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