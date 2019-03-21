import React from 'react'
import styled from 'styled-components'
import logo from '../../img/jackiechan.jpg'
import {Link} from 'react-router-dom'

export default class GameOptions extends React.Component{

    constructor(){
        super();
        this.state = {
            categoryList: 0,
            difficulty: "Easy",
            length: 10,
            categories: 0,
            format: ""
        }
        this.populateCategories = this.populateCategories.bind(this)
        this.updateDifficulty = this.updateDifficulty.bind(this)
        this.updateCategories = this.updateCategories.bind(this)
        this.updateFormat = this.updateFormat.bind(this)

    }

    // run as callback function when the category data is fetched and pushed into the component's state
    populateCategories(e){
        console.log("Building category select table from json")
        console.log(this.state.categoryList)
    }
    
    updateDifficulty(e){
        this.setState({difficulty: e.target.innerHTML}, function(){
            console.log("Difficulty set to " + this.state.difficulty)
        })
        
    }
    updateCategories(e){
        this.setState({categories: e.target.title}, function(){
            console.log("Selected Category: "+ this.state.categories)
            // find way to add selected class upon selection (also remove selected from other categories)

        })
    }

    updateFormat(e){
        this.setState({format: e.target.value}, ()=>{
            console.log(this.state.format)
        }
        
        )
    }

    componentDidMount(){
        // fetch list of categories when the component mounts
        fetch('https://opentdb.com/api_category.php').then((res)=>{
            return res.json()
        }).then((json)=>{
            console.log(json)
            // store categories in state
            this.setState({categoryList: json.trivia_categories}, this.populateCategories())
            
            
        })
    }




     render(){
        return(
            <Options>
                <OptionsTitle>
                    GAME SETUP
                </OptionsTitle>
                {/* difficulty select */}
                <SelectionTitle>CHOOSE YOUR DIFFICULTY</SelectionTitle>
                <DifficultySelect>
                    <Difficulty value="Easy" onClick={this.updateDifficulty}>
                        Easy
                    </Difficulty>
                    <Difficulty value="Medium" onClick={this.updateDifficulty}>
                        Medium
                    </Difficulty>
                    <Difficulty value="Hard" onClick={this.updateDifficulty}>
                        Hard
                    </Difficulty>
                </DifficultySelect>
                <SelectionTitle>
                    CHOOSE FORMAT
                </SelectionTitle>
                <QuestionTypeContainer>
                    <QuestionTypeOption value="true-false" onClick={this.updateFormat}>
                        True/False
                    </QuestionTypeOption>
                    <QuestionTypeOption value="multiple-choice" onClick={this.updateFormat}>
                        Multiple Choice
                    </QuestionTypeOption>
                    <QuestionTypeOption value="combination" onClick={this.updateFormat}>
                        Combination
                    </QuestionTypeOption>
                </QuestionTypeContainer>

                {/* temporary display showing when the list of trivia categories have been received by the client */}
                <div id="categories-received-message">
                {
                    this.state.categoryList !== 0 && <SelectionTitle>CHOOSE UP TO THREE CATEGORIES</SelectionTitle>
                }
                </div>
            
             
                 {/* categories table (select 3 categories out of the list for the test to consist of) */}
                {this.state.categoryList !== 0 && 
                    <CategorySelect>
                         {/* use map function to display a table cell for each category in array */}
                         {this.state.categoryList.map((category)=>{
                             return(
                                 <CategoryCell title={category.id} key={category.id} onClick={this.updateCategories}>
                                     {category.name}
                                 </CategoryCell>
                             )
                         })}
                 </CategorySelect>
                }
                <ButtonContainer>
                    <Button>
                        <Link to="/">BACK</Link>
                    </Button>
                    <Button>
                        CONTINUE
                    </Button>
                </ButtonContainer>
                
            </Options>
        )
     }
    
}

const Options = styled.div`
    padding: 1.5rem;
    font-size: .8rem;
    margin-bottom: 1rem;
    background: linear-gradient(to bottom, #282c34, #122c34)
`

const CategorySelect = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 8px;
    border: 2px solid rgb(116,43,198);
    border-top: none;
    margin: 0 auto;
    color: rgb(177, 162, 193);
    max-width: 600px;
    padding: .8rem;
    &:hover{
        border: none;
    }
    `;
const CategoryCell = styled.div`
    width: calc(33.33% - .6rem);
    padding: .3rem;
    transition: .4s;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 8px;
    &:hover{
        background-color: rgba(116, 43, 198, .3);
        cursor: pointer;
        color: white;
        transform: scale(1.1)
    }
    &.selected{
        background-color: rgba(255,255,255,.5);
        border-bottom: 2px solid white;

    }
    `;
const DifficultySelect = styled.div`
        display: flex;
        flex-direction: row;
        padding: .8rem;
        border-radius: 8px;
        border: 2px solid rgb(116,43,198);
        border-top: none;
        &:hover{
            border: none;
        }

    `
const Difficulty = styled.div`
        flex-grow: 1;
        color: rgb(177, 162, 193);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border-radius: 8px;
        padding: .3rem;
        transition: .3s;
        &:hover{
            background-color: rgba(116, 43, 198, .3);
            cursor: pointer;
            color: white;
            transform: scale(1.1)
        }
    `
const QuestionTypeContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: .8rem;
    border-radius: 8px;
    border: 2px solid rgb(116,43,198);
    border-top: none;
    &:hover{
        border: none;
    }
`
const QuestionTypeOption = styled.div`
    width: calc(33.33% - .6rem);
    padding: .3rem;
    transition: .4s;
    text-align: center;
    display: flex;
    border-radius: 8px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: rgb(177, 162, 193);

    &:hover{
        background-color: rgba(116, 43, 198, .3);
        cursor: pointer;
        color: white;
        transform: scale(1.1)
    }
`
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Button = styled.button`
    font-size: 1rem;
    width:40%;
    padding: .8rem;
    color: white;
    border: 2px solid rgb(116,43,198);
    background-color: rgba(0,0,0,.1);
    margin-top: 1rem;
    border-radius: 8px;
`
const OptionsTitle = styled.h2`
    margin: 0;
    letter-spacing: 1rem;
    text-shadow: 2px 2px 6px black;
`
const SelectionTitle = styled.h4`
    margin: 0;
    position: relative;
    top: .5rem;
    margin-top: 1rem;
    letter-spacing: 1px;
    text-shadow: 2px 2px 6px rgba(0,0,0,.4);

`