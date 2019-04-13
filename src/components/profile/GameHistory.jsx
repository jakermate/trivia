import React, { Component } from 'react'
import styled from 'styled-components'
import colors from '../../values/colors'
import ScoreBar from './ScoreBar'
import arrow from '../../img/open-arrow.svg'

export default class GameHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            games: [
                {
                    category: "Film",
                    difficulty: "Hard",
                    format: "Mixed",
                    testLength:20,
                    score: 10
                }
            ]
        }
        this.toggleGameInfo = this.toggleGameInfo.bind(this)
    }
    componentDidMount(){
        // this.setState({games: this.props.games}) use when receiving data from props
    }
    // open game info panel when header clicked
    toggleGameInfo(e){
        
        let gameString = e.currentTarget.id
        gameString = gameString.replace('header','info')
        console.log(gameString)
        if(document.getElementById(gameString).style.display === "block"){
            document.getElementById(gameString).style.display = "none"
        }
        else{
            document.getElementById(gameString).style.display = "block"

        }
    }

    render() {
        return (
            <GameHistoryContainer>
                {this.state.games.map((game)=>
                    <Game> 
                        <GameHeader id={'gameheader'+this.state.games.indexOf(game)} key={this.state.games.indexOf(game)} onClick={this.toggleGameInfo}>
                            {game.category}
                            {game.difficulty}
                            {game.format}
                            <ArrowContainer>
                                <Arrow src={arrow}></Arrow>
                            </ArrowContainer>
                        </GameHeader>
                        <GameInfo id={'gameinfo'+this.state.games.indexOf(game)} style={{display: 'none'}}>
                            <ScoreBar score={game.score} testLength={game.testLength}></ScoreBar>
                        </GameInfo>
                    </Game>
                    )}
            </GameHistoryContainer>
        )
    }
}
// game history container
const GameHistoryContainer = styled.div`
    background: rgba(0,0,0,0.10);
`
// container for each individual game mapped from array
const Game = styled.div`
    width:100%;

`
// individual header with title for a single round
const GameHeader = styled.div`
    padding: .6rem 1rem;
`
// uncollapsed information on individual game when opened
const GameInfo = styled.div`
    background: rgba(0,0,0,0.14);
    padding: .6rem 1rem;

`
// arrows
const ArrowContainer = styled.div`

`
const Arrow = styled.img`
`