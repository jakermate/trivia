import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import arrow from '../../img/arrow.svg'

export default class CategorySelect extends Component {
  constructor(props){
      super(props)
      this.removeEntertainment = this.removeEntertainment.bind(this)
  }

  removeEntertainment(category){
    let newString = category.replace('Entertainment: ', "").replace('Science:', '')
    console.log(newString)
    return newString
  }

  render() {
    return (
      <CategorySelectBox>
          <Title>CATEGORY</Title>
          <CellContainer>
                {/* map out cells for each category in the prop 'categories' */}
                {this.props.categories.map(category=>{
                    return(
                        <CategoryCell data-category={category.id} onClick={this.props.updateCategory} key={category.id}>{this.removeEntertainment(category.name)}</CategoryCell>
                    )
          })}
          <GradientOverlay></GradientOverlay>
          </CellContainer>
          
      </CategorySelectBox>
    )
  }
}

const Title = styled.div`
    font-size: 1.2rem;
    letter-spacing: 4px;
    font-weight: bold;
    margin-bottom: .8rem;
`

// arrow icon
const Icon = styled.img`

`
const CategorySelectBox = styled.div`
    border-top: none;
    position: absolute;
    z-index: 100;
    top: 0;
    bottom:0;
    left:0;
    right:0;
    margin: 0 auto;
    display:flex;
    flex-direction: column;
    padding: 1rem 1rem;
    justify-content: flex-start;
    color: white;
    max-width: 600px;
    background: linear-gradient(to bottom, #333333, #777777);
    border-style: none;
    appearance:none;
    text-align: center;
    &:hover{
        border: none;
    }
    `;
const CategoryCell = styled.option`
    padding: .8rem;
    width: 100%;
    transition: .4s;
    text-align: left;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    `;

const CellContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 1rem 0 3rem 0;
    overflow-x: hidden;
    position: relative;

`

const GradientOverlay = styled.div`
    width:100%;
    position: fixed;
    bottom: 1rem;
    left: 0;
    right:0;
    height: 2rem;
    background: linear-gradient(to bottom, #77777700, #777777) 
`