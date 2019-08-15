import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../values/colors'
import GameHistory from './GameHistory'
import ProfileImage from '../../img/avatar.svg'
import edit from '../../img/edit.svg'
import check from '../../img/check.svg'
import {Link} from 'react-router-dom'
import back from '../../img/back-button.svg'

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
                <Header>
                    <Link to="/home">
                        <img src={back} alt=""/>
                    </Link>
                    <HeaderTitle>BRAIN SPACE</HeaderTitle>
                </Header>
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
    display:flex;
    flex-direction:column;
    background: linear-gradient(-134deg, ${colors.gradThree} 0%, ${colors.gradOne} 37%, ${colors.gradTwo} 100%);

` 
const Header = styled.div`
    box-sizing:border-box;
    height: 88px;
    width: 100%;
    background: rgba(0,0,0,0.18);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
`
const HeaderTitle = styled.div`
    font-family: LucidaGrande;
    font-size: 11px;
    color: #00D1AE;
    letter-spacing: 5.09px;
    text-align: center;
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
`
const GamesPlayed = styled.div`
    background-color: rgba(0,0,0,.17);
    padding:.8rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    
`
const ProfileHeader = styled.div`
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ProfileInfo = styled.div`

`
