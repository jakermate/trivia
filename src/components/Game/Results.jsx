import React, { Component } from 'react'
import styled from 'styled-components'
import Score from '../../models/score'
import { questionTrueFalse } from '../../models/question';
import colors from '../../values/colors'
import Header from '../setup/Header'
import Chart from 'chart.js'
import Doughnut from 'react-chartjs-2'

export default class Results extends Component {
constructor(props){
    super(props)
    this.state = {
        length: 20,
        correct: 0,
        difficulty: "Medium",
        test: [
            {
                category: "General Knowledge",
                difficulty: "Medium",
                length: 20

            }
        ],
        correctedTest: [],
        category: "General Knowledge",
        scoringComplete: false, // used to display the scoring message
        scoringMessages: [
            "Making superficial judgements based on your answers...",
            "Deciding whether or not to hand you a dunce cap...",
            "Are you smart enough to be my friend...",
            "I guess we'll both see if you chose the right profession..."
        ],
        message:{
            0: 'You should have at least guessed one correctly...',
            1: ''
        }
    }
}
// component constructor
componentDidMount(props){
    // set complete test prop to state
    this.setState({test: this.props.completeQuestions || this.state.test}, () => {
        this.constructScoreObject(this.state.test)
    })
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


// instantiate new score object to then pass up to the App component and store in cookies/ send to score server
constructScoreObject(test){
    console.log(test)
        let newScore = new Score(test[0].category, test[0].difficulty, test, test.length, this.props.user.profile.id)
        this.setState({correctedTest: newScore},()=>{
            console.log('Test has been corrected.')
            this.setState({scoringComplete: true}, ()=>{
                // this.setState({difficulty: this.state.correctedTest[0].difficulty, category: this.state.correctedTest[0]. category})
            })
        })
    }




    render() {
        // chart
        let data = {
                datasets: [{
                    
                    data:[(this.state.length - this.state.correct), this.state.correct],
                    backgroundColor:[
                        `rgba(0,0,0,.1)`,
                        `${colors.secondaryLight}`
                    ],
                    borderColor: `rgba(255,255,255,.1)`,
                    borderWidth: 2
                }]
            }
        let options = {

        }

        let component = 
                        <ResultPage>
                        <GradingSpinner>
                            Grading Test
                        </GradingSpinner>
                        </ResultPage>
    
        if(this.state.scoringComplete){
            component =     <ResultPage>
                            <Header></Header>
                            <ResultsContent>
                                <ResultsTitle>
                                    RESULTS
                                </ResultsTitle>
                                <ScoreContainer>
                                    
                                    <ResultChart>
                                        <TestDetails>
                                            <Category>{this.state.category}</Category>
                                            <Difficulty>{this.state.difficulty}</Difficulty>
                                        </TestDetails>
                                        
                                        <Doughnut data={data} options={{maintainAspectRatio: true}}></Doughnut>
                                        <ScoreNumber><Number>{this.state.correct}</Number> OF <Number>{this.state.length}</Number> CORRECT</ScoreNumber>
                                        <Message>{this.state.message[this.state.correct].toUpperCase()}</Message>
                                    </ResultChart>
                                </ScoreContainer>
                                <FormContainer>
                                    {this.props.user.profile.name === "NewUser" &&
                                    <EnterName>
                                        <NameInput>
                                            
                                        </NameInput>
                                    </EnterName>
                                }
                                    <InputForm>
                                        <label></label>
                                    </InputForm>
                                </FormContainer>
                            </ResultsContent>
                           </ResultPage>
                           }
        return (
            <ResultPage>
            <ResultsContainer>
                {component}
            </ResultsContainer>
            </ResultPage>
        )
    }
}

const GradingSpinner = styled.div`

`
const ScoringInProgress = styled.div`
    position: absolute;
    top: 0;
    bottom:0;
    right: 0;
    left:0;
`
const ResultPage = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`
const ResultsContainer = styled.div`
    width: 100%;
    color: ${colors.primaryLight};
    height: 100%;
    box-sizing: border-box;
    background: linear-gradient(-134deg, ${colors.gradThree} 0%, ${colors.gradTwo} 37%, ${colors.gradThree} 100%);

`
const ResultChart = styled.div`
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    font-size: .8rem;
    box-sizing: border-box;
    box-shadow: 4px 4px 8px rgba(0,0,0,.3), 0 0 20px rgba(0,0,0,.2);
    background: linear-gradient(to bottom, rgba(255,255,255,.1), rgba(255,255,255,0));
`


const Category = styled.div`
    font-size: 1rem;
    text-transform:uppercase;
    color:${colors.secondaryLight};
    letter-spacing: .2rem;
`
const Difficulty = styled.small`
    text-transform:uppercase;
    color:${colors.thirdLight};
    letter-spacing: .2rem;
`
const ResultsContent = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 2rem 1rem;
`
const Message = styled.div`
    font-size: .5rem;
    letter-spacing: .1rem;
    margin-top: 1rem;
`
const ResultsTitle = styled.h4`
    letter-spacing: .3rem;
`

const ScoreContainer = styled.div`

`
const ScoreNumber = styled.div`
    margin-top: 1rem;
`
const Number = styled.span`
    font-weight: bold;
    color: ${colors.secondaryDark};
`
const FormContainer = styled.div`

`
const InputForm = styled.form`

`
const TestDetails = styled.div`
`
const EnterName = styled.div`
`
const NameInput = styled.input`

`
