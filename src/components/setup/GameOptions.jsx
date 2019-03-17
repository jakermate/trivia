import React from 'react'
import styled from 'styled-components'

export default class GameOptions extends React.Component{

    constructor(){
        super();
        this.state = {
            categories: 0,
            difficulty: "easy",
            length: 10
        }
        this.populateCategories = this.populateCategories.bind(this)
        this.updateDifficulty = this.updateDifficulty.bind(this)

    }

    // run as callback function when the category data is fetched and pushed into the component's state
    populateCategories(){
        console.log("Building category select table from json")
        console.log(this.state.categories)
    }
    updateDifficulty(difficulty){
        this.setState({difficulty: difficulty})
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
                <DifficultySelect>
                    <Difficulty onclick={this.updateDifficulty}>
                        Easy
                    </Difficulty>
                    <Difficulty onclick={this.updateDifficulty}>
                        Medium
                    </Difficulty>
                    <Difficulty onclick={this.updateDifficulty}>
                        Hard
                    </Difficulty>
                </DifficultySelect>
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
                         {this.state.categories.map(function(category){
                             return(
                                 <CategoryCell>
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
    }
    `;
const DifficultySelect = styled.div`
        display: flex;
        flex-direction: row;

    `
const Difficulty = styled.div`
        flex-grow: 1;
        color: rgb(177, 162, 193);
        border: 1px solid rgb(116,43,198);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: .3rem;
        &:hover{
            background-color: rgba(116, 43, 198, .3);
            cursor: pointer;
            color: white;
        }
    `