import React from 'react'
import styled from 'styled-components'
import colors from '../../values/colors'

export default class ScoreBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            width: 0
        }
    }

    componentDidMount(props){
        this.setState({width: (this.props.score / this.props.testLength) * 100})

    }


    render(){
        return(
            <ScoreBarContainer>
              <Scorefill style={{width: `${this.state.width}%`}}></Scorefill>
            </ScoreBarContainer>

        )
    }
  
}

const ScoreBarContainer = styled.div`
    margin-top: 20px;
    background: ${colors.greyDark};
    box-shadow: 4px 4px 8px rgba(0,0,0,.3);
    width: 100px;
    height: 15px;
    ::after{
        
    }
`
const Scorefill = styled.div`
    position:relative;
    background: linear-gradient(to right, ${colors.primaryLight}, ${colors.secondaryLight});
    height: 100%;
    box-shadow: 0 0 5px 0 rgba(0,209,174,0.63), 4px 4px 8px rgba(0,0,0,.3);
    border-right: 1px solid ${colors.thirdLight};
`