import React from 'react'
import styled, {keyframes} from 'styled-components'
import he from 'he' // html decoding
import TrueButton from '../buttons/TrueButton'
import FalseButton from '../buttons/FalseButton'
import MultipleChoiceButton from '../buttons/MultipleChoiceButton'
import bg from '../../img/brain-space-alt-bg.svg'

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
        e.persist()
        let newQuestion = this.state.question
        newQuestion.selectedAnswer = e.target.innerHTML
        this.setState({question: newQuestion}, function(){
            // remove selected class from any dom element
            if(document.querySelector('.selected')){
                document.querySelector('.selected').classList.remove('selected')
            }
            // add selected class to the dom element that triggered the event
            e.target.classList.add('selected')
            
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
                console.log('Multiple choice question found, shuffling array.')
                this.setState({shuffledAnswers: this.shuffleArray(this.state.question)}, ()=>{
                    console.log('Answer array shuffled to: '+ this.state.shuffledAnswers)
                    this.forceUpdate()
                })
            }
        })
        
    }

    render(){
        let component
        // conditional rendering based upon question type
        if(this.state.question.type === "multiple"){
            component = 
                (
                <QuestionContentContainer>
                    <QuestionContainer>
                        <QuestionBackground>
                            {/* <QuestionType>
                                {this.state.question.category}
                            </QuestionType> */}
                            <Title>
                                {this.state.question.questionString}
                            </Title>
                        </QuestionBackground>
                    </QuestionContainer>

                    {/* Container that holds all answers contained in the state from the question objects */}
                    <AnswerContainer>
                        {/* map iterates over the list of multiple choice options and generates an Answer div for each. */}
                        {/* Use shuffledAnswers state to display multiple choice answers in random order */}
                        {this.state.shuffledAnswers.map((answer)=>{
                                return(
                                    <MultipleChoiceButton selectedAnswer={this.state.question.selectedAnswer} key={answer} onClick={this.updateAnswer} answer={answer} />
                                )
                            }
                        )}
                    </AnswerContainer>

                    
                </QuestionContentContainer>
                )
            
        }
        else if(this.state.question.type === "boolean"){
            component = (
                <QuestionContentContainer>
                    <QuestionContainer>
                        <QuestionType>
                            {this.state.question.category}
                        </QuestionType>
                        <Title>
                            {this.state.question.questionString}
                        </Title>
                    </QuestionContainer>
                    <AnswerContainer>
                        <TrueButton id="true-button" onClick={this.updateAnswer}/>
                        <FalseButton id="false-button" onClick={this.updateAnswer}/>
                    </AnswerContainer>
                </QuestionContentContainer>
                )
            
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

// animation
const glow = keyframes`
    0%{
        box-shadow: 0px 0px 12px rgba(0,0,0,.3), 0px 0px 20px 0 white, 0 0 120px #ff184a;
    }
    50%{
        box-shadow: 0px 0px 12px rgba(0,0,0,.3), 0px 0px 50px 0 #28ed3fff, 0 0 120px #a113ff;
    }
    100%{
        box-shadow: 0px 0px 12px rgba(0,0,0,.3), 0px 0px 20px 0 white, 0 0 120px #ff184a;
    }
`
const questionPop = keyframes`
    from{
        opacity: 0;
    }
    to{ 
        opacity: 1; 
    }
`


// styles
const QuestionType = styled.div`
    margin: 1rem 0;
    font-size:1.2rem;
    font-style: italic;
    text-shadow: 2px 2px 4px rgba(0,0,0,.1);
` 

const QuestionContainer = styled.div`
    width:300px;
    height: 300px;
    position: relative;
    border: 5px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 5px 5px 12px #99999999, 0 0 30px 10px rgba(100,100,100,.3);
    background: linear-gradient(to bottom, #fafafa, #dadada);
    border-radius: 300px;
    animation: ${glow} 15s ease-in-out infinite;
`

const QuestionBackground= styled.div`
    background-image: url(${bg});
    width:300px;
    height: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 300px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

const QuestionContentContainer = styled.div`
    width: 100%;
    height: 100%;
    animation: ${questionPop} .4s ease-in-out;
`
const Title = styled.h4`
    margin: 0 auto;
    font-size: 1.4rem;
    text-align: center;
    max-width: 200px;
`
const AnswerContainer = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 300px;
    justify-content: space-around;
    padding: 2rem 1rem;
`