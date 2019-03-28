import React from 'react'
import styled from 'styled-components'
import he from 'he' // html decoding

export default class Question extends React.Component{
    constructor(props){
        super(props)
        this.state={
            question: {

            },
            shuffledAnswers: [ // shuffled on each component mounting

            ]
        }
        this.updateAnswer = this.updateAnswer.bind(this)
    }


     // shuffle array of possible answers before they are displayed so that the correct answer is not always listed last
     shuffleArray(question){  // use only for multiple choice questions
        let array = question.answers
        let i = 0
        let j = 0
        let temp = null

        for(i = array.length - 1; i > 0; i -= 1){
            j = Math.floor(Math.random() * (i+1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array // returns shuffled array
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
            // upon each mounting of component, create shuffled copy of array if question is multiple choice
            if (this.state.question.type === "multiple"){
                this.setState({shuffledAnswers: this.shuffleArray(this.state.question)}, function(){
                    console.log('Answer array shuffled to: '+ this.state.shuffledAnswers)
                })
        }
        })
        
    }

    render(){
        let component
        // conditional rendering based upon question type
        if(this.state.question.type === "multiple"){
            component = 
                (<QuestionContainer>
                    <QuestionType>
                        {this.state.question.category}
                    </QuestionType>
                    <Title>
                        {this.state.question.questionString}
                    </Title>
                    {/* Container that holds all answers contained in the state from the question objects */}
                    <AnswerContainer>
                        {/* map iterates over the list of multiple choice options and generates an Answer div for each. */}
                        {/* Use shuffledAnswers state to display multiple choice answers in random order */}
                        {this.state.shuffledAnswers.map(function(answer){
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
                    <QuestionType>
                        {this.state.question.category}
                    </QuestionType>
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
const QuestionType = styled.div`
    margin: 1rem 0;
    font-size:1.2rem;
    font-style: italic;
    text-shadow: 2px 2px 4px rgba(0,0,0,.1)
` 

const QuestionContainer = styled.div`

`
const Title = styled.h2`

`
const AnswerContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 2rem 1rem;
`
const Answer = styled.button`
    font-size: 1rem;
    padding: 1rem;
    box-shadow: 2px 2px 4px rgba(0,0,0,.3);
`