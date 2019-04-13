import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../values/colors'
import GameHistory from './GameHistory'

export default class Profile extends Component {
    render() {
        return (
            <ProfilePage id="profile-page">
                <ProfileHeader>

                </ProfileHeader>
                <ProfileInfo>

                </ProfileInfo>
                <GameHistory>

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
