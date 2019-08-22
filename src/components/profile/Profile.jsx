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
                    <BackLink to="/home">
                        <BackImage src={back} alt=""/>
                    </BackLink>
                    <HeaderTitle>BRAIN SPACE</HeaderTitle>
                </Header>
                <ProfileContainer>
                    <ProfileHeader>
                        <ProfileImageContainer id="profile-image">
                            <img src={ProfileImage} alt=""/>
                        </ProfileImageContainer>
                        <div id="name">
                            <div id="edit-name" onClick={this.toggleNameEdit}>
                                <img src={edit} alt=""/>
                            </div>
                            <NameDisplayContainer>
                            {/* toggle between display name and edit name input */}
                            {!this.state.editName ? 
                                <NameDisplay id="name">
                                    {this.props.profile.name ? this.props.profile.name : "New Player"}
                                </NameDisplay> :
                                <div style={{'width': '100%'}}>
                                    <NameInput id="name-input" maxLength="14" onChange={this.nameTyping} value={this.state.nameInput}>

                                    </NameInput>
                                    <span onClick={this.confirmNameChange}><Check src={check} alt=""/></span>
                                </div>
                                

                            }
                            </NameDisplayContainer>
                            <UserID id="user-id">ID: {this.props.profile.id}</UserID>
                        </div>
                        
                        
                        
                    </ProfileHeader>
                <ProfileInfo>
                </ProfileInfo>

                <GamesPlayed id="games-played">
                        <HistoryTitle>GAME HISTORY {this.props.profile.gamesPlayed}</HistoryTitle>
                </GamesPlayed>
                <GameHistory scores={this.props.scores}>
                </GameHistory>
                </ProfileContainer>
            </ProfilePage> 
        )
    }
}

const ProfilePage = styled.div`
    width: 100%;
    box-sizing: border-box;
    position: relative;
    display:flex;
    flex-direction:column;
    background: linear-gradient(-134deg, ${colors.gradThree} 0%, ${colors.gradOne} 37%, ${colors.gradTwo} 100%);

` 
const PageTitle = styled.h4`
    color: ${colors.primaryLight};
    margin: 0;
`
const ProfileContainer = styled.div`
    padding: 2rem 1rem;
`
const ProfileImageContainer = styled.div`
    padding: 1rem;
`
const Header = styled.div`
    box-sizing:border-box;
    padding: 1rem;
    height: 88px;
    display:flex;
    flex-direction: row;
    position: relative;
    align-items: center;
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
    position: absolute;
    left:0;
    z-index:0;
    right: 0;
`
const BackLink = styled(Link)`
    position: relative;
    z-index: 1;
`
const BackImage = styled.img`
`
const NameDisplayContainer = styled.div`
    height: 2rem;
    overflow: hidden;
    display: flex;
    width: 100%;
    flex-direction: row;
    box-sizing: border-box;
`
const NameDisplay = styled.h2`
    text-transform: uppercase;
    font-size: .8rem;
    letter-spacing: 4px;
    margin: .4rem 0;
    height: 1rem;
    color: ${colors.primaryLight};
    box-sizing: border-box;
`
const NameInput = styled.input`
    background-color: rgba(0,0,0,0);
    border: none;
    height: 1rem;
    width: calc(100% - 20px);
    margin: .4rem 0;
    outline: none;
    caret-color: ${colors.primaryLight};
    color: ${colors.primaryLight};
    font-size: .4rem;
    letter-spacing: 4px;
    padding: 4px;
    box-sizing: border-box;
`
const Check = styled.img`
    width: 16px;
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
    font-size: .8rem;
`
const GamesPlayed = styled.div`
    padding:.2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    
`
const ProfileHeader = styled.div`
    min-height: 200px;
    display: flex;
    box-sizing: border-box;
    padding: 2rem 1rem;
    flex-direction: row;
    box-shadow: 4px 4px 8px rgba(0,0,0,.3), 0 0 20px rgba(0,0,0,.2);
    background: linear-gradient(to bottom, rgba(255,255,255,.1), rgba(255,255,255,0));
    align-items: center;
`

const ProfileInfo = styled.div`

`
