import React from 'react'
import styled from 'styled-components'

export default class Setup extends React.Component{
    constructor(){
        super()
        this.state={
            selectedCategories: [

            ],
            difficulty: "easy"
        }

    }

    addCategory(){

    }
    removeCategory(){

    }
    changeDifficulty(){

    }
    beginGame(){

    }
    render(){
        return(

            <div id="setup">
            
            </div>
        )
    }
}

const StartGameButton = styled.button`

`