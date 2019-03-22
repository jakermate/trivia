import React from 'react'
import styled from 'styled-components'
import logo from '../../img/jackiechan.jpg'
import {Link} from 'react-router-dom'
import jackie from '../../img/jackiechan.jpg'

export default class GameOptions extends React.Component{

    constructor(){
        super();
        this.state = {
            categoryList: 0,
            difficulty: "Medium",
            length: 20,
            categories: 0,
            format: "mixed",
            selectedCategory: 0
        }
        this.populateCategories = this.populateCategories.bind(this)
        this.updateDifficulty = this.updateDifficulty.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
        this.updateFormat = this.updateFormat.bind(this)

    }

    // run as callback function when the category data is fetched and pushed into the component's state
    populateCategories(e){
        console.log("Building category select table from json")
        console.log(this.state.categoryList)
    }
    
    updateDifficulty(e){
        this.setState({difficulty: e.target.name}, function(){
            console.log("Difficulty set to " + this.state.difficulty)
        })
        
    }
    updateCategory(e){
        this.setState({selectedCategory: e.target.value}, function(){
            console.log("Selected Category: "+ this.state.selectedCategory)
            // find way to add selected class upon selection (also remove selected from other categories)

        })
    }

    updateFormat(e){
        this.setState({format: e.target.value}, ()=>{
            console.log(this.state.format)
        }
        
        )
    }

    // pass option config up to application, which wil then pass it down to game component
    passOptionsToApplication(){

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
            <Options id="options-container">
                <BackgroundOverlay>
                    <OptionsTitle>
                        GAME SETUP
                    </OptionsTitle>
                    {/* difficulty select */}
                    <SelectionTitle>DIFFICULTY</SelectionTitle>
                    <DifficultySelect>
                        <Difficulty name="easy" style={unselected} value="Easy" onClick={this.updateDifficulty}>
                            EASY
                        </Difficulty>
                        <Difficulty name="medium" style={selected} value="Medium" onClick={this.updateDifficulty}>
                            MEDIUM
                        </Difficulty>
                        <Difficulty name="hard" style={unselected} value="Hard" onClick={this.updateDifficulty}>
                            HARD
                        </Difficulty>
                    </DifficultySelect>
                    <SelectionTitle>
                        FORMAT 
                    </SelectionTitle>
                    <QuestionTypeContainer>
                        <QuestionTypeOption style={unselected} value="boolean" onClick={this.updateFormat}>
                            TRUE / FALSE
                        </QuestionTypeOption>
                        <QuestionTypeOption style={unselected} value="multiple" onClick={this.updateFormat}>
                            MULTIPLE CHOICE
                        </QuestionTypeOption>
                        <QuestionTypeOption style={selected} value="mixed" onClick={this.updateFormat}>
                            MIXED FORMAT
                        </QuestionTypeOption>
                    </QuestionTypeContainer>

                    {/* temporary display showing when the list of trivia categories have been received by the client */}
                    <div id="categories-received-message">
                    {
                        this.state.categoryList !== 0 && <SelectionTitle>CATEGORY</SelectionTitle>
                    }
                    </div>
                
                
                    {/* categories table (select 3 categories out of the list for the test to consist of) */}
                    {this.state.categoryList !== 0 && 
                        <CategorySelect>
                            {/* use map function to display a table cell for each category in array */}
                            {this.state.categoryList.map((category)=>{
                                return(
                                    <CategoryCell onSelect={this.updateCategory} style={{"background-color": "black"}} value={category.id} key={category.id} onClick={this.updateCategories}>
                                        {category.name}
                                    </CategoryCell>
                                )
                            })}
                    </CategorySelect>
                    }
                    <ButtonContainer>
                        <BackButton>
                            <Link to="/">BACK</Link>
                        </BackButton>
                        <ContinueButton>
                            CONTINUE
                        </ContinueButton>
                    </ButtonContainer>
                </BackgroundOverlay>
            </Options>
        )
     }
    
}

const Options = styled.div`
    width:100%;
    height: 100%;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: .8rem;
    margin-bottom: 1rem;
    background-image: url();

`

const BackgroundOverlay = styled.div`
    width:100%;
    height: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-size: cover;
    background: linear-gradient(to bottom, #28f1fc77, #111111ee);
`

const CategorySelect = styled.select`
    border-top: none;
    margin: 0 auto;
    color: white;
    max-width: 600px;
    padding: .8rem 0rem;
    background-color: rgba(0,0,0,0);
    border-style: none;
    text-align: center;
    &:hover{
        border: none;
    }
    `;
const CategoryCell = styled.option`
    padding: .3rem;
    transition: .4s;
    text-align: center;
    font-size: .6rem;
    &:hover{
        background-color: rgba(255, 255, 255, .3);
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
        padding: .8rem 0rem;
        letter-spacing: 5px;
        &:hover{
            border: none;
        }

    `
const Difficulty = styled.div`
        flex-grow: 1;
        color: white;
        text-align: center;
        display: flex;
        text-shadow: 2px 2px 4px rgba(255,255,255,.3);
        flex-direction: column;
        font-weight: bold;
        justify-content: space-around;
        align-items: center;
        padding: .3rem;
        transition: .3s;
        &:hover{
            cursor: pointer;
            color: white;
            transform: scale(1.1)
        }
    `
const QuestionTypeContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: .8rem 0rem;
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
    letter-spacing: 5px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(255,255,255,.3);
    font-weight: bold;

    &:hover{
        cursor: pointer;
        color: white;
        text-shadow:2px 2px 8px rgba(255,255,255,.4);
        transform: scale(1.1)
    }
`
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const ContinueButton = styled.button`
    font-size: 1rem;
    padding: .8rem 1.5rem;
    text-align: center;
    color: rgb(27, 252, 57);
    background-color: rgba(0,0,0,.1);
    margin-top: 1rem;
    border-radius: 25px;
    font-weight: bold;
    border-color: rgb(27, 252, 57);
    letter-spacing: 2px;
    transition: .2s;
    &:hover{
        transform: scale(1.03);
        box-shadow: 2px 2px 8px rgba(255,255,255,.3);
        border-color: rgb(27, 252, 57);
    }
`
const BackButton = styled.button`
    font-size: 1rem;
    padding: .8rem 1.5rem;
    text-align: center;
    color: white;
    font-weight: bold;
    background-color: rgba(0,0,0,.1);
    margin-top: 1rem;
    border-radius: 25px;
    letter-spacing: 2px;
    transition: .2s;
    &:hover{
        transform: scale(1.03);
        box-shadow: 2px 2px 8px rgba(255,255,255,.3);
    }
    `
const OptionsTitle = styled.h2`
    margin: 0;
    color:white;
    font-size: 1.4rem;
    letter-spacing: 1rem;
    text-shadow: 2px 2px 6px rgba(0,0,0,.5);
`
const SelectionTitle = styled.h4`
    margin: 0;
    color:white;
    font-size: 1rem;
    font-weight: bolder;
    position: relative;
    margin-top: 1rem;
    letter-spacing: .8rem;
    text-shadow: 2px 2px 6px rgba(0,0,0,.4);

`
// inline style
const selected = {
    fontSize: '1rem',
    borderBottom: "2px solid white"
}
const unselected = {
    fontSize: '.8rem',
    color: "rgba(255,255,255,.7)"
}