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
            currentQuestion: 0,
            answers: [

            ],
            category: "",
            difficulty: "",
            format: "", // multiple or boolean or mixed
            error: false
        }

        const rootURL = "https://opentdb.com/api.php?"


    }
    
    // request question set from api with values in state
    fetchQuestions(category){
        // check for format
        let format = ""
        if (this.state.format == "boolean" || "multiple" ){
            format = "&type="+this.state.format
            console.log("format entered as "+ format)
        }
        // single category
        fetch(`${this.rootURL}amount=20&category=${this.state.category}&difficulty=${this.state.difficulty}${format}`).then(
            (res)=>{
                res.json()
            }
        ).then(
            (json)=>{
                // change to call method parseQuestions instead of putting into state here
                // check if response code is 0 (ok)  and set error in Game component state tofalse
                if(json.response === 0){
                    console.log(json.response)
                    this.setState({error: false}, this.parseQuestions(json))
                    
                }
                else{
                    // if response code is bad, set error state in component to true and display error (with button to retry)
                    this.setState({error: true})
                }
            }
        ).catch((err)=>{
            console.log('Error during fetching of question set...')
        })
    }

    // parse questions into correct object format and load into questions array in state
    parseQuestions(json){ //questionSet should be json received from api
        let questions = json.results // should be array of questions
        // import question object model formats
        let questionTrueFalse = require('../../models/question').questionTrueFalse
        let questionMultipleChoice = require('../../models/question').questionMultipleChoice
        // initialize new array for modeled question set
        var questionSet = []
        // loop through question set and determine if each index contains a true/false or a multiplechoice
        for(let i in questions){
            let newQuestion = {}
            if(questions[i].type == "multiple"){ //use multiple choice model
                newQuestion = new questionMultipleChoice()
                newQuestion.questionString = questions[i].question
                newQuestion.answers = questions[i].incorrect_answers
                newQuestion.answers.push(questions[i].correct_answer) // so correct answer SHOULD always be the last index of answer array
                newQuestion.difficulty = questions[i].difficulty
                newQuestion.category = questions.category
            }
            else if(questions[i].type == "boolean"){ //use boolean model
                newQuestion = new questionTrueFalse()
                newQuestion.questionsString = questions[i].question
                newQuestion.correctAnswer = questions[i].correct_answer // comes in as True or False string
                newQuestion.difficulty = questions[i].difficulty
                newQuestion.category = questions[i].category
            }
            else{
                console.log('Error processing question '+ questions[i].question+" at index"+ i)
            }
            questionSet.push(newQuestion)
            console.log("Question set model populated: "+questionSet)
        }
        // set parsed array of question objects into state array
        this.setState({questions: questionSet})
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
    back(){
        // return game state to previous question

        // move pointer to previous question
        this.setState({currentQuestion: this.state.currentQuestion - 1},
            // then update app state with current question)
            function(){
                this.updateAppGameState(this.state.currentQuestion)
            })
    }

    updateAppGameState(){
        this.props.changeQuestion(this.state.currentQuestion)
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
                        <BackButton onClick={this.back}>BACK</BackButton>
                    }
                    {/* display next/done depending on if this querstion is the last */}
                    {this.state.currentQuestion < this.state.questions.length ?
                        <NextButton onClick={this.next}>NEXT</NextButton>
                        :
                        <DoneButton onClick={this.done}>DONE</DoneButton>
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