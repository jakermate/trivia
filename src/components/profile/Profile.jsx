import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../values/colors'
import GameHistory from './GameHistory'
import Scorebar from './ScoreBar'
import ProfileImage from '../../img/avatar.svg'

export default class Profile extends Component {
    render() {
        return (
            <ProfilePage id="profile-page">
                <ProfileHeader>
                    <div id="profile-image">
                        <img src={ProfileImage} alt=""/>
                    </div>
                    <h2 id="name">{this.props.profile.name}</h2><div id="edit-name"></div>
                    <h5 id="user-id">{this.props.profile.id}</h5>
                </ProfileHeader>
                <ProfileInfo>
                    <div id="games-played">
                        <span>GAMES PLAYED: {this.props.profile.gamesPlayed}</span>
                    </div>
                </ProfileInfo>
                <GameHistory>
                    {this.props.scores.map((scoreObject, index)=>
                        <div id={`score-${index}`}>
                            <h3>{scoreObject.category}</h3>
                            <h5>{scoreObject.difficulty}</h5>
                            <span>{scoreObject.date}</span>

                            {/* scorebard */}
                            <Scorebar score={scoreObject.correct} total={scoreObject.total}></Scorebar>
                        </div>


                        )}
                
                </GameHistory>
            </ProfilePage>
        )
    }
}

const ProfilePage = styled.div`
    height:100%;
    width: 100%;
    position: relative;
    background: linear-gradient(-134deg, ${colors.backgroundPrimary} 0%, ${colors.backgroundSecondary} 37%, ${colors.backgroundThird} 100%);

` 
const ProfileHeader = styled.div`
`

const ProfileInfo = styled.div`

`
