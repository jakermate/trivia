import React from 'react'
import styled, {keyframes} from 'styled-components'
import Question from './Question'
import {BrowserRouter, Route} from 'react-router-dom'
import he from 'he'
import Cookies from 'js-cookie' // cookie manipulation
import Spinner from '../misc/Spinner'
import NextButton from '../buttons/NextButton'
import BackButton from '../buttons/BackButton'
import Swal from 'sweetalert2';
import colors from '../../values/colors'


export default class Game extends React.Component{
    constructor(){
        super()
        this.state = {
            inPlay: true,
            questions: "",
            currentQuestion: 0, // pointer to game state/position
            complete: false,
            category: 11,
            difficulty: "easy", // easy medium or hard
            format: "multiple", // multiple or boolean or mixed
            error: false,
            rootURL: "https://opentdb.com/api.php?"  // base url for api
        }

        this.pushToGameState = this.pushToGameState.bind(this)
        this.next = this.next.bind(this)
        this.back = this.back.bind(this)


    }


    // STARTUP FUNCTIONALITY
    // call fetch function when component has mounted
    componentDidMount(){
        // set up back interupt
        window.onbeforeunload = function(){
            Swal.fire({
                type: "warning"
            })
        }

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


    /// BUTTON FUNCTIONALITY

    // go to next question
    next(){
        // if selectedAnswer of question-STATE is not empty/0, allow player to progress to next question
        console.log("Moving forward from question INDEX" + this.state.currentQuestion)
        // check if next question is less than length of question array
        if (this.state.currentQuestion < this.state.questions.length){
            this.setState({currentQuestion: this.state.currentQuestion + 1}, function(){
                console.log("Moving to question INDEX" + this.state.currentQuestion)
            })
        } // now see if next question index would exceed length of question array
        else if (this.state.currentQuestion + 1 >= this.state.questions.length){
            console.log('That was the last question.  Finalizing quiz...')
            // set complete-STATE to true to signal test has finished
            this.setState({complete: true}, this.setState({inPlay: false}))

        }

    }


    // previous question (if currentQuestion is not 0)
    back(){
        // return game state to previous question
        console.log("Going back.")
        // move pointer to previous question
        if(this.state.currentQuestion > 0){
            this.setState({currentQuestion: this.state.currentQuestion - 1},
                // then update app state with current question)
                function(){
                    console.log('Moving back to previous question: INDEX '+ this.state.currentQuestion)
                })
        }
        
    }

    backAlert(){

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
        // force update is needed to rerender this component when state change occurs in question's selectedAnswer in order to show the next button.
        this.forceUpdate()
    }

    // game completion methods

    setCookies(){ // read previous cookies and create/add current score data to cookie field (reset expiration timer to one month)
        let cookies = document.cookie
        console.log(cookies)
    }

    // COMPONENT MARKUP
    render(){
        // in progress/ loading component
        let component = <GameContainer> 
                            
                        </GameContainer>
        // questions received component
        if(this.state.questions !== ""){
            component = <GameContainer>
                            <ProgressHeader>
                                <span className="bold">{this.state.currentQuestion + 1}</span> / {this.state.questions.length}
                            </ProgressHeader>
                            {/* nested router for routing each question to its own url */}
                            {/* <BrowserRouter>
                                <Route path="/question/:num" render={()=>(
                                    <Question question={this.state.questions[this.state.currentQuestion]} />
                                )} />
                            </BrowserRouter>
                                */}
                            {/* render question component if they have been received */}
                            {this.state.questions !== "" && 
                                // the key parameter (which uses the currentQuestion index, tells react to re-mount this component when the key/question is changed)
                                <Question key={this.state.currentQuestion} pushToGameState={this.pushToGameState} question={this.state.questions[this.state.currentQuestion]}>

                                </Question>
                            }
                            <Controls>
                                {/* only display back button if not on first question */}
                                {this.state.currentQuestion > 0 ? 
                                    <BackButton isActive={true} onClick={this.back} /> : 
                                    <BackButton isActive={false} />
                                }
                                {/* display next/done depending on if this question is the last */}
                                {this.state.questions[this.state.currentQuestion].selectedAnswer !== null ?
                                    <NextButton isActive={true} onClick={this.next} /> :
                                    <NextButton isActive={false} />
                                }
                                
                            </Controls>
                        </GameContainer>
        }
        
        return(
            <GamePage>
                 {component}
            </GamePage>
           
        )
    }

}

// animations
const horizon = keyframes`
`

// contains conditionaly rendered components
const GamePage = styled.div`
    width:100%;
    height: 100%;
`
// container of each conditional component markup
const GameContainer = styled.div`
    width:100%;
    min-height:100%;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    background: linear-gradient(-134deg, ${colors.backgroundPrimary} 0%, ${colors.backgroundSecondary} 37%, ${colors.backgroundThird} 100%);
`


const ProgressHeader = styled.div`
    width: 100%;
    position: absolute;
    left:0;
    right:0;
    top: 1rem;
`



const Controls = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    height: 100px;
    width:100%;
    position: relative;
    justify-content: space-between;
`

const DoneButton = styled.button`
`