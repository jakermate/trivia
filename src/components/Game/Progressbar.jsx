import React from 'react'
import styled from 'styled-components'
import colors from '../../values/colors'

const ProgressBar = (props) => {
    return <BarContainer>
                <Bar style={{width: `${(props.currentQuestion/props.total)*100}%`}}>
                    
                </Bar>
            </BarContainer>
}

export default ProgressBar

const BarContainer = styled.div`
    width: 200px;
    height: 1px;
    margin:5px auto 0 auto;
    background-color: ${colors.greyDark};
`
const Bar = styled.div`
    height:100%;
    background: linear-gradient(to right, ${colors.primaryLight}, ${colors.secondaryLight});
    box-shadow: 0 0 4px ${colors.glowPrimary};
    border-right: 2px solid ${colors.secondaryLight};
    ::after{
        width:100%;
        height:100%;
        box-shadow:0 0 2px 10px ${colors.primaryLightest};
    }
`