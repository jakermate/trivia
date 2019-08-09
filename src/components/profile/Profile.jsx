import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../values/colors'
import GameHistory from './GameHistory'
import ProfileImage from '../../img/avatar.svg'
import edit from '../../img/edit.svg'
import check from '../../img/check.svg'

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            editName: false,
            nameInput: ''
        }
    }
    toggleNameEdit = () => {
        this.setState({editName: !this.state.editName}, ()=>{
            if(this.state.editName){
                document.getElementById('name-input').focus()
            }
        })
        
    }
    nameTyping = (e) => {
        this.setState({nameInput: e.target.value.toUpperCase()}, ()=>{
            console.log(this.state.nameInput)
        })
    }
    confirmNameChange = () => {
        this.props.setName(this.state.nameInput)
        this.setState({editName: false})
    }
    render() {
        return (
            <ProfilePage id="profile-page">
                <Header></Header>
                <ProfileHeader>
                    <div id="profile-image">
                        <img src={ProfileImage} alt=""/>
                    </div>

                    <div id="edit-name" onClick={this.toggleNameEdit}>
                        <img src={edit} alt=""/>
                    </div>
                     {/* toggle between display name and edit name input */}
                     {!this.state.editName ? 
                        <NameDisplay id="name">
                            {this.props.profile.name ? this.props.profile.name : "New Player"}
                        </NameDisplay> :
                        <div>
                            <NameInput id="name-input" onChange={this.nameTyping} value={this.state.nameInput}>

                            </NameInput>
                            <span onClick={this.confirmNameChange}><img src={check} alt=""/></span>
                        </div>
                        

                    }
                    
                    <UserID id="user-id">ID: {this.props.profile.id}</UserID>
                </ProfileHeader>
                <ProfileInfo>
                </ProfileInfo>

                <GamesPlayed id="games-played">
                        <HistoryTitle>GAME HISTORY {this.props.profile.gamesPlayed}</HistoryTitle>
                </GamesPlayed>
                <GameHistory scores={this.props.scores}>
                </GameHistory>
            </ProfilePage> 
        )
    }
}

const ProfilePage = styled.div`
    height:100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    background: linear-gradient(-134deg, ${colors.backgroundPrimary} 0%, ${colors.backgroundSecondary} 37%, ${colors.backgroundThird} 100%);

` 
const Header = styled.div`
    width: 100%;
    height: 60px;
`
const NameDisplay = styled.h2`
    text-transform: uppercase;
    font-size: .4rem;
    letter-spacing: 4px;
    margin: .4rem 0;
    height: 1rem;
    color: ${colors.primaryLight};
`
const NameInput = styled.input`
    background-color: rgba(0,0,0,0);
    border: none;
    height: 1rem;
    margin: .4rem 0;
    outline: none;
    caret-color: ${colors.primaryLight};
    color: ${colors.primaryLight};
    font-size: .4rem;
    letter-spacing: 4px;
    padding: 4px;
`
const UserID = styled.h5`
    font-weight: bold;
    font-size: .3rem;
    margin: 0;
    color: ${colors.greyedOut};
`
const HistoryTitle = styled.span`
    color: ${colors.secondaryLight};
    letter-spacing:.2rem;
    font-size: .5rem;
    padding: .4rem;
`
const GamesPlayed = styled.div`
    background-color: rgba(0,0,0,.3);
`
const ProfileHeader = styled.div`
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ProfileInfo = styled.div`

`
