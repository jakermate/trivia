import React from 'react'
import styled from 'styled-components'

export default class Game extends React.Component{
    constructor(){
        super()
        this.state = {
            inPlay: "false",
            questions: [

            ],
            currentQuestion: 1,
            answers: [

            ]
        }


    }
    
    checkIfDone(){
        // check if question is final
    }
    submitAnswer(){
        // append answer for current question to answers array

    }
    goBack(){
        // return game state to previous question

    }
    
    render(){
        return(
            <div id="game">
            
            </div>
        )
    }

}