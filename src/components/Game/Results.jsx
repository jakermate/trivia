import React, { Component } from 'react'
import styled from 'styled-components'
import Score from '../../models/score'
import { questionTrueFalse } from '../../models/question';

export default class Results extends Component {
constructor(props){
    super(props)
    this.state = {
        length: 0,
        correct: 0,
        difficulty: 0,
        category: 0,
        scoringComplete: false, // used to display the scoring message
        scoringMessages: [
            "Making superficial judgements based on your answers...",
            "Deciding whether or not to hand you a dunce cap...",
            "Are you smart enough to be my friend...",
            "I guess we'll both see if you chose the right profession..."
        ]
    }
}

// checks if an individual question is right and returns a true or false
checkIfRight(question){
    if(question.selectedAnswer === question.correctAnswer){
        return true // correctly answered
    }
    else{
        return false // incorrectly answered
    }
}

// shows correct choice from a multiple choice question
showCorrectChoice(question){
    return question.correctAnswer
}

// instantiate new score object to then pass up to the App component and store in cookies/ send to score server
constructScoreObject(){
    if(this.state.length !== 0 && this.state.difficulty !== 0 && this.state.category !== 0){
        console.log('Valid score. Creating new score object. ')
        let newScore = new Score(this.state.category, this.state.difficulty, this.state.correct, this.state.length, document.cookies.id)

        // call reference to App method and pass score object into it
        this.props.receiveNewScore(newScore)
    }
}

// send results to server cache
sendResultsToServer(resultsObject){
    console.log('Sending results to server.')
    fetch('/logscore', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
    }).next(res=>res.json()).next(json=>{
        //handle success message from server upon caching score data
    }).catch(err=>{
        // handle error with server score system
        console.log('Server storage of score incomplete.')
        console.log(err)

    }
    )
}

    render() {

        return (
            <ResultsContainer>
                <ScoringInProgress></ScoringInProgress>
                <ResultsContent>
                    <ResultsTitle>
                        RESULTS
                    </ResultsTitle>
                    <ScoreContainer>
                        <TestDetails>
                            Difficulty: {this.state.difficulty}
                            Category: {this.state.category}
                        </TestDetails>
                        <Number>{this.state.correct}</Number> / <Number>{this.state.length}</Number>
                    </ScoreContainer>
                    <FormContainer>
                        <InputForm>
                            <label></label>
                        </InputForm>
                    </FormContainer>
                </ResultsContent>
        
            </ResultsContainer>
        )
    }
}

const ScoringInProgress = styled.div`
    position: absolute;
    top: 0;
    bottom:0;
    right: 0;
    left:0;
`

const ResultsContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem 1rem;

`

const ResultsContent = styled.div`
    width: 100%;
    height: 100%;
`

const ResultsTitle = styled.h2`
    font-weight: bold;
`

const ScoreContainer = styled.div`

`
const Number = styled.span`

`
const FormContainer = styled.div`

`
const InputForm = styled.form`

`
const TestDetails = styled.div`
`