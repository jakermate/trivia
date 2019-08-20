import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import arrow from '../../img/arrow.svg'
import logo from '../../img/setup-logo.svg'
import colors from '../../values/colors';

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
          <LogoContainer>
              <Logo src={logo} alt=""/>
          </LogoContainer>
          <Title>CATEGORY</Title>
          <CellContainer>
                {/* map out cells for each category in the prop 'categories' */}
                {this.props.categories.map(category=>{
                    return(
                        <CategoryCell data-category={category.id} onClick={()=>{this.props.updateCategory(category.id)}} key={category.id}>{this.removeEntertainment(category.name)}</CategoryCell>
                    )
          })}
          </CellContainer>
          
      </CategorySelectBox>
    )
  }
}

const LogoContainer = styled.div`
    margin-top:.8rem;
`

const Title = styled.div`
    margin-top: .8rem;
    font-size: .6rem;
    color: ${colors.secondaryLight};
    letter-spacing: 8px;
    font-weight: bold;
    margin-bottom: .8rem;
`

// arrow icon
const Icon = styled.img`

`
const Logo = styled.img`
    width: 70px;
`

const CategorySelectBox = styled.div`
    border-top: none;
    position: fixed;
    z-index: 100;
    top: 0;
    bottom:0;
    left:0;
    right:0;
    margin: 0 auto;
    display:block;
    overflow-y: scroll;
    flex-direction: column;
    padding: 1rem 1rem;
    justify-content: flex-start;
    color: white;
    max-width: 600px;
    background-image: linear-gradient(-134deg, ${colors.gradOne}, ${colors.gradThree}, ${colors.gradTwo});
    border-style: none;
    appearance:none;
    text-align: center;
    &:hover{
        border: none;
    }
    `;
const CategoryCell = styled.div`
    padding: .8rem;
    width: 100%;
    transition: .4s;
    text-align: center;
    color: ${colors.primaryLight};
    box-sizing: border-box;
    font-size: .8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    `;

const CellContainer = styled.div`
    width: 100%;
    padding: 1rem 0 3rem 0;
    overflow-x: hidden;
    position: relative;
    flex-grow:1;
`
