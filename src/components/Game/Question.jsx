import React from 'react'
import styled, {keyframes} from 'styled-components'
import he from 'he' // html decoding
import TrueButton from '../buttons/TrueButton'
import FalseButton from '../buttons/FalseButton'
import MultipleChoiceButton from '../buttons/MultipleChoiceButton'
import bg from '../../img/brain-space-alt-bg.svg'
import colors from '../../values/colors'

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
const bgThrob = keyframes`
    from{
        opacity: 1
    }
    to{
        opacity: .4
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
    width:200px;
    height: 200px;
    box-sizing: border-box;
    position: relative;
    border: 1px solid ${colors.primaryLightest};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem auto;
    color: white;
    border-radius: 6px;
    box-shadow: 0 0 12px 3px rgba(102,232,244,.2), 0 0 30px 10px rgba(102,232,244,.3), 0 30px 40px 10px rgba(0,0,0,.5);
`

const QuestionBackground= styled.div`
    background-image: url(${bg});
    width:100%;
    height: 100%;
    position: relative;
    display: flex;
    padding: 0 1rem;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    /* animation: ${bgThrob} 3s ease-in-out infinite */
`

const QuestionContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    animation: ${questionPop} .4s ease-in-out;
    background: linear-gradient(-134deg, ${colors.gradThree} 0%, ${colors.gradOne} 37%, ${colors.gradTwo} 100%);

`
const Title = styled.h4`
    font-size: .8rem;
    text-align: center;
    max-width: 200px;
`
const AnswerContainer = styled.div`
    display:flex;
    flex-direction: column;
    flex-wrap: nowrap;
    max-width: 300px;
    margin: 0 auto;
    justify-content: space-around;
    padding: 0rem 1rem;
`