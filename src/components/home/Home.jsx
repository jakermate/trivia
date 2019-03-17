import React from 'react'
import GameOptions from '../setup/GameOptions'

export default class Home extends React.Component{
    render(){
        return(
            <div id="home-page">
                <h1 id="home-title">
                    Game Setup
                </h1>
                <GameOptions>

                </GameOptions>
            </div>
        )
    }
}