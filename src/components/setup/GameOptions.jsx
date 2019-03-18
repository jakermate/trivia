import React from 'react'
import styled from 'styled-components'

export default class GameOptions extends React.Component{

    constructor(){
        super();
        this.state = {
            categories: 0,
            difficulty: "Easy",
            length: 10,
            category: 0
        }
        this.populateCategories = this.populateCategories.bind(this)
        this.updateDifficulty = this.updateDifficulty.bind(this)
        this.updateCategory = this.updateCategory.bind(this)

    }

    // run as callback function when the category data is fetched and pushed into the component's state
    populateCategories(){
        console.log("Building category select table from json")
        console.log(this.state.categories)
    }
    updateDifficulty(e){
        this.setState({difficulty: e.target.innerHTML}, function(){
            console.log("Difficulty set to " + this.state.difficulty)
        })
        
    }
    updateCategory(e){
        this.setState({category: e.target.innerHTML}, function(){
            console.log("Selected Category: "+ this.state.category)
        })
    }

    componentDidMount(){
        // fetch list of categories when the component mounts
        fetch('https://opentdb.com/api_category.php').then((res)=>{
            return res.json()
        }).then((json)=>{
            console.log(json)
            // store categories in state
            this.setState({categories: json.trivia_categories}, this.populateCategories())
            
            
        })
    }




     render(){
        return(
            <div id="options">
                {/* difficulty select */}
                <div id="difficulty-title">CHOOSE YOUR DIFFICULTY</div>
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
                <div id="question-type-select-title">
                    CHOOSE FORMAT
                </div>
                <QuestionTypeContainer>
                    <QuestionTypeOption>
                        True/False
                    </QuestionTypeOption>
                    <QuestionTypeOption>
                        Multiple Choice
                    </QuestionTypeOption>
                    <QuestionTypeOption>
                        Combination
                    </QuestionTypeOption>
                </QuestionTypeContainer>

                {/* temporary display showing when the list of trivia categories have been received by the client */}
                <div id="categories-received-message">
                {
                    this.state.categories !== 0 && <div>CHOOSE YOUR CATEGORY</div>
                }
                </div>
            
             
                 {/* categories table (select 3 categories out of the list for the test to consist of) */}
                {this.state.categories !== 0 && 
                    <CategorySelect>
                         {/* use map function to display a table cell for each category in array */}
                         {this.state.categories.map((category)=>{
                             return(
                                 <CategoryCell key={category.id} onClick={this.updateCategory}>
                                     {category.name}
                                 </CategoryCell>
                             )
                         })}
                 </CategorySelect>
                }
               
            </div>
        )
     }
    
}

const CategorySelect = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid rgb(116,43,198);
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
    &:hover{
        background-color: rgba(116, 43, 198, .3);
        cursor: pointer;
        color: white;
        transform: scale(1.1)
    }
    `;
const DifficultySelect = styled.div`
        display: flex;
        flex-direction: row;
        padding: .8rem;
        border: 1px solid rgb(116,43,198);
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
        padding: .3rem;
        transition: .3s
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
    border: 1px solid rgb(116,43,198);
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