import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class Header extends Component {


    render() {
        return (
            <SetupHeader id="setup-header">
                <HeaderContent>
                    <BackButton />
                    <HeaderTitle>BRAIN SPACE</HeaderTitle>
                    <ProfileButton></ProfileButton>
                </HeaderContent>
            </SetupHeader>
        )
        }
    }

const SetupHeader = styled.div`
    height: 88px;
    width: 100%;
    background: rgba(0,0,0,0.18);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
    box-sizing:border-box;
`
const HeaderContent = styled.div`
    width:100%;
    box-sizing: border-box;
    height: 100%;
    padding: .5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const HeaderTitle = styled.div`
    font-family: LucidaGrande;
    font-size: 11px;
    color: #00D1AE;
    letter-spacing: 5.09px;
    text-align: center;
`