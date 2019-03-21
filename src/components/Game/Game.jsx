import React from 'react'
import styled from 'styled-components'
import Question from './Question'
import {BrowserRouter, Route} from 'react-router-dom'


export default class Game extends React.Component{
    constructor(){
        super()
        this.state = {
            inPlay: "false",
            questions: [

            ],
            currentQuestion: 1,
            answers: [

            ],
            category: "",
            difficulty: "",
            format: "" // multiple or boolean or mixed
        }

        const rootURL = "https://opentdb.com/api.php?"


    }
    
    // request question set from api with values in state
    fetchQuestions(category){
        // single category
        fetch(`${this.rootURL}amount=20&category=${this.state.category}&difficulty=${this.state.difficulty}&type=${this.state.format}`).then(
            (res)=>{
                res.json()
            }
        ).then(
            (json)=>{
                this.setState({questions: json}, ()=>{
                    console.log("Questions set into comonent state: " + this.state.questions)
                    // change to call method parseQuestions instead of putting into state here
                })
            }
        )
    }

    // parse questions into correct object format and load into questions array in state
    parseQuestions(questionSet){ //questionSet should be json received from api
        let questions = []
        // import question object model formats
        let questionTrueFalse = require('../../models/question').questionTrueFalse
        let questionMultipleChoice = require('../../models/question').questionMultipleChoice
        // loop through question set and determine if each index contains a true/false or a multiplechoice
        for(let i in questionSet){

        }
        // set parsed array of question objects into state array
        this.setState({questions: questions})
    }



    // check if current question is final question and return boolean
    checkIfDone(){
        // check if question is final
        if (this.state.currentQuestion === this.state.questions.length -1){
            return true
        }
        else{
            return false
        }
        
    }
    // final check popup/alert to make sure user wants to submit challenge for evaluation
    finalCheck(){

    }
    submitAnswer(){
        // append answer for current question to answers array

        // move pointer to next question
        if (!this.checkIfDone()){
            console.log("Next question")
            this.setState({currentQuestion: this.state.currentQuestion + 1})
        }
        if(this.checkIfDone()){
            console.log("That was the last question.  Check if they wish to finish challenge.")
            this.finalCheck()
        }
        
    }
    goBack(){
        // return game state to previous question

        // move pointer to previous question
        this.setState({currentQuestion: this.state.currentQuestion - 1})
    }
    
    render(){
        return(
            <div id="game">

                {/* nested router for routing each question to its own url */}
                <BrowserRouter>
                    <Route path="/question/:num" render={()=>(
                        <Question question={this.state.questions[this.state.currentQuestion]} />
                    )} />
                </BrowserRouter>

                <Question question={this.state.questions[this.state.currentQuestion]}>

                </Question>
                <Controls>
                    {/* only display back button if not on first question */}
                    {this.state.currentQuestion > 0 && 
                        <BackButton>BACK</BackButton>
                    }
                    {/* display next/done depending on if this querstion is the last */}
                    {this.state.currentQuestion < this.state.questions.length ?
                        <NextButton>NEXT</NextButton>
                        :
                        <DoneButton>DONE</DoneButton>
                    }
                    
                </Controls>
            </div>
        )
    }

}
const Controls = styled.div`
    display: flex;
    flex-direction: row;

`
const BackButton = styled.button`

`
const NextButton = styled.button`

`
const DoneButton = styled.button`
`