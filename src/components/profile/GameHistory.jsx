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
                {this.state.games.map((scoreObject, index)=>
                    <Game> 
                        <GameHeader id={'gameheader-'+index.toString()} key={this.state.games.indexOf(scoreObject)} onClick={this.toggleGameInfo}>
                            <HeaderDate>{scoreObject.date}</HeaderDate>
                            <ArrowContainer>
                                <Arrow src={arrow}></Arrow>
                            </ArrowContainer>
                        </GameHeader>
                        <GameInfo id={'gameinfo-'+index.toString()} style={{display: 'none'}}>
                            <HeaderCategory>{scoreObject.category}</HeaderCategory>
                            <HeaderDifficulty>{scoreObject.difficulty}</HeaderDifficulty>
                            <ScorePercentage>{(scoreObject.score/scoreObject.testLength)*100}%</ScorePercentage>
                            <ScoreBar score={scoreObject.score} testLength={scoreObject.testLength}></ScoreBar>
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
    min-height: 200px;
    text-transform: uppercase;
    box-sizing: border-box;
    letter-spacing: .3rem;
`
// container for each individual game mapped from array
const Game = styled.div`
    width:100%;

`
// individual header with title for a single round
const GameHeader = styled.div`
    padding: .6rem 1rem;
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(0,0,0,.3);
`
// uncollapsed information on individual game when opened
const GameInfo = styled.div`
    background: rgba(0,0,0,0.14);
    padding: .6rem 1rem;

`
const HeaderCategory = styled.div`
    color:${colors.primaryLight};
    font-size: 1.2rem;
`
const HeaderDifficulty = styled.div`
    color:${colors.secondaryLight};
    font-size: .8rem;
    letter-spacing: .12rem;
`
const HeaderDate = styled.div`
    color:${colors.thirdLight};
`
// arrows
const ArrowContainer = styled.div`
    
    position: absolute;
    right:0;
`
const Arrow = styled.img`
`
const ScorePercentage = styled.div`
    letter-spacing: .1rem;
    font-size: .4rem;
    color: ${colors.thirdLight};
`