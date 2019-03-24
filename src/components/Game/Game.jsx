import React from 'react'
import styled from 'styled-components'
import Question from './Question'
import {BrowserRouter, Route} from 'react-router-dom'
import he from 'he'


export default class Game extends React.Component{
    constructor(){
        super()
        this.state = {
            inPlay: "false",
            questions: "",
            currentQuestion: 0,
            answers: [

            ],
            category: 11,
            difficulty: "easy",
            format: "boolean", // multiple or boolean or mixed
            error: false,
            rootURL: "https://opentdb.com/api.php?"
        }

        this.pushToGameState = this.pushToGameState.bind(this)


    }

    // call fetch function when component has mounted
    componentDidMount(){
        this.fetchQuestions()
    }
    
    
    // request question set from api with values in state
    fetchQuestions(category){
        // check for format
        let format = ""



        if (this.state.format === "boolean" || "multiple" ){
            format = "&type="+this.state.format
            console.log("format entered as "+ format)
        }
        // print request string out to console
        console.log(this.state.rootURL + "amount=20&category=" + this.state.category + "&difficulty=" + this.state.difficulty+format)

        // single category
        fetch(`${this.state.rootURL}amount=20&category=${this.state.category}&difficulty=${this.state.difficulty}${format}`).then(
            (res)=>res.json()  // if you use a block {} then you need to use return for the promise return
            ).then(
                (json)=>{
                    // log out parsed response body
                    console.log(json)
                    // change to call method parseQuestions instead of putting into state here
                    // check if response code is 0 (ok)  and set error in Game component state tofalse
                    if(json.response_code === 0){
                        console.log(json)
                        this.setState({error: false}, this.parseQuestions(json))
                        
                    }
                    else{
                        // if response code is bad, set error state in component to true and display error (with button to retry)
                        this.setState({error: true})
                    }
                }
        ).catch((err)=>{
            console.log(err)
            console.log('Error during fetching of question set...')
        })
    }

    // parse questions into correct object format and load into questions array in state
    parseQuestions(json){ //questionSet should be json received from api
        let questions = json.results // should be array of questions
        // import question object model formats
        let questionTrueFalse = require('../../models/question').questionTrueFalse
        let questionMultipleChoice = require('../../models/question').questionMultipleChoice
        console.log(questionTrueFalse)
        // initialize new array for modeled question set
        var questionSet = []
        // loop through question set and determine if each index contains a true/false or a multiplechoice
        for(let i in questions){
            let newQuestion = {}
            if(questions[i].type === "multiple"){ //use multiple choice model
                let decodedQuestionString = he.decode(questions[i].question)  // decode from html to txt
                newQuestion = new questionMultipleChoice(decodedQuestionString,questions[i].difficulty,questions.category,questions[i].incorrect_answers,questions[i].correct_answer)
                
            }
            else if(questions[i].type === "boolean"){ //use boolean model
                let decodedQuestionString = he.decode(questions[i].question)  // decode from html to txt
                newQuestion = new questionTrueFalse(decodedQuestionString,questions[i].difficulty,questions[i].category,questions[i].correct_answer)
             
            }
            else{
                console.log('Error processing question '+ questions[i].question+" at index"+ i)
            }
            questionSet.push(newQuestion)
        }
        console.log(questionSet)
        // set parsed array of question objects into state array
        this.setState({questions: questionSet}, function(){
            console.log("Question set successfully set to component state: "+this.state.questions)
        })
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

    // reference to this function is passed down to each rendered question component
    // this function is called in Question component after each answer is selected
    // child component state is updated and then passed up by referencing this function
    pushToGameState(newQuestion){
        // need to splice the new question into array position where old version was
        let questions = this.state.questions
        questions.splice(this.state.currentQuestion,1,newQuestion)
        console.log(JSON.stringify(this.state.questions))
    }



    render(){
        return(
            <GameContainer>
                <ProgressHeader>
                    Question {this.state.currentQuestion + 1} of {this.state.questions.length}
                </ProgressHeader>
                {/* nested router for routing each question to its own url */}
                {/* <BrowserRouter>
                    <Route path="/question/:num" render={()=>(
                        <Question question={this.state.questions[this.state.currentQuestion]} />
                    )} />
                </BrowserRouter>
                 */}
                {/* render querstion component if they have been received */}
                {this.state.questions !== "" && 
                    <Question pushToGameState={this.pushToGameState} question={this.state.questions[this.state.currentQuestion]}>

                    </Question>
                }
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
            </GameContainer>
        )
    }

}

const GameContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 4rem 1rem;
`


const ProgressHeader = styled.div`
    width: 100%;
`


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