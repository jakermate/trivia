import React from 'react'
import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import jackie from '../../img/jackiechan.jpg'
import logo from '../../img/brain-space-alt.svg'
import Config from '../../models/config'
import Footer from '../home/Footer'
// requiure background image
import bg from '../../img/PosterCollage.jpg'
import CategorySelect from './CategorySelect'
import Swal from 'sweetalert2'

export default class GameOptions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categoryList: 0,
            difficulty: "",
            length: 20,
            categories: 0,
            format: "",
            selectedCategory: 0,
            categorySelectOpened: false
        }
        this.populateCategories = this.populateCategories.bind(this)
        this.updateDifficulty = this.updateDifficulty.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
        this.updateFormat = this.updateFormat.bind(this)
        this.startGame = this.startGame.bind(this)
        this.openCategorySelect = this.openCategorySelect.bind(this)
        this.returnCategoryIndexFromId = this.returnCategoryIndexFromId.bind(this)

    }

    // style variables
    // color object storing values to be swapped out for backgriund overlay gradient
    colors = {
        blue: "#28f1fc77",
        yellow: "#E4DE7F77"
    }
    bgStyle = {
        backgroundImage: 'url('+bg+')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat'
    }
    // run as callback function when the category data is fetched and pushed into the component's state
    populateCategories(e){
        console.log("Building category select table from json")
        console.log(this.state.categoryList)
        this.setInitialCategory()
    }

    setInitialCategory(){
        this.setState({selectedCategory: this.state.categoryList[0].id}, ()=>{

        console.log("Initial category set: "+ this.state.selectedCategory)
        })

    }
    
    updateDifficulty(e){
        this.setState({difficulty: e.target.name}, function(){
            console.log("Difficulty set to " + this.state.difficulty)
        })
        
    }
    // opens fullscreen category select screen (as opposed to previous select options)
    openCategorySelect(e){
        // toggle state of category select to open or closed
        this.setState({categorySelectOpened: !this.state.categorySelectOpened},
            console.log('Category Select Panel Toggled'))
            console.log(this.state)
    }
    updateCategory(e){
        e.persist()
        this.setState({selectedCategory: e.target.getAttribute('data-category')}, function(){
            console.log("Selected Category: "+ this.state.selectedCategory)
            this.setState({categorySelectOpened: false})
        })
    }

    // returns the index in categoryList array of category object with id from state.selectedCategory
    returnCategoryIndexFromId(categoryId){
        console.log('looking for index of'+categoryId)
        for(let i in this.state.categoryList){
            // should be == not === as the two numbers are not exact matching data type???
            if (this.state.categoryList[i].id == this.state.selectedCategory)
            {
                console.log("Index "+ i)
                return i
            }
        }
        
    }

    updateFormat(e){
        this.setState({format: e.target.value}, ()=>{
            console.log(this.state.format)
        }
        )
    }
    // startgame begins event chain of moving towards game component
    startGame(){
        // perform check to ensure all categories have been selected
        if (this.state.difficulty !== "" && this.state.format !== "" && this.state.selectedCategory !== 0){
            console.log("Starting game...")
            // create config object
            let newConfig = new Config(this.state.difficulty, this.state.format, this.state.category)
            console.log(newConfig)
            // pass config object up chain to app component function (reference to function passed down as prop: receiveConfig)
            this.props.receiveConfig(newConfig) // will be received in App component as configObject

        }
        else{ // handle invalid config options
            console.log("Not all config options have been specified.")
            // setup alert
            Swal.fire({
                title: 'Setup not complete...',
                text: 'You must select a difficulty, category, and format before continuing.',
                type: 'warning',
                confirmButtonText: 'BACK',
                background: '#000000',
                color: 'white'
                })
        }
            }


    componentDidMount(){
        

        // fetch list of categories when the component mounts
        fetch('https://opentdb.com/api_category.php').then((res)=>{
            return res.json()
        }).then((json)=>{
            console.log(json)
            // store categories in state
            this.setState({categoryList: json.trivia_categories}, function(){
                this.populateCategories()
            }
        )
            
            
        })
    }




     render(){
        return(
            <Options id="options-container">
                <Background>
                </Background>
                <BackgroundOverlayBlack>
                    <BackgroundOverlayColors>
                            <SetupContent id="setup-content">
                            <div id="title-logo-container">
                                <LogoContainer>
                                    <Img src={logo} alt=""/>
                                </LogoContainer>
                                <OptionsTitle>
                                    GAME SETUP
                                </OptionsTitle>
                            </div>
                            {/* difficulty select */}
                            <OptionsSectionContainer>
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
                                <DifficultySlider type="range" min="1" max="3" step="1" value="1"/>

                            </OptionsSectionContainer>
                            <OptionsSectionContainer>
                                <SelectionTitle>
                                    FORMAT 
                                </SelectionTitle>
                                <FormatTypeContainer>
                                    <FormatTypeOption style={unselected} value="boolean" onClick={this.updateFormat}>
                                        TRUE / FALSE
                                    </FormatTypeOption>
                                    <FormatTypeOption style={unselected} value="multiple" onClick={this.updateFormat}>
                                        MULTIPLE CHOICE
                                    </FormatTypeOption>
                                    <FormatTypeOption style={selected} value="mixed" onClick={this.updateFormat}>
                                        MIXED FORMAT
                                    </FormatTypeOption>
                                </FormatTypeContainer>
                            </OptionsSectionContainer>
                            
                            <OptionsSectionContainer>
                                {/* temporary display showing when the list of trivia categories have been received by the client */}
                                <div id="categories-received-message">
                                {
                                    this.state.categoryList !== 0 && <SelectionTitle onClick={this.openCategorySelect}>CATEGORY</SelectionTitle>
                                }
                                </div>
                                {
                                    this.state.selectedCategory !== 0 && <SelectedCategory>{this.state.categoryList[this.returnCategoryIndexFromId(this.state.selectedCategory)].name}</SelectedCategory>
                                }
                                {this.state.categoryList !== 0 && this.state.categorySelectOpened === true && 
                                    <CategorySelect updateCategory={this.updateCategory} categories={this.state.categoryList} />
                                }
                            </OptionsSectionContainer>
                            
                            <ButtonContainer>
                                <BackButton>
                                    <Link to="/">BACK</Link>
                                </BackButton>
                                <ContinueButton onClick={this.startGame}>
                                    CONTINUE
                                </ContinueButton>
                            </ButtonContainer>
                        </SetupContent>
                        {/* footer */}
                        
                    </BackgroundOverlayColors>
                    </BackgroundOverlayBlack>
            </Options>
        )
     }
    
}

// animation

const scroll = keyframes`
    from{
        transform: "translateX(0%)"
    }
    to{
        transform: "translateX(100%)"
    }
`

// background poster collage
const Background = styled.div`
    box-sizing: border-box;
    display:flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: column;
    justify-content: space-between;
    animation: ${scroll} 6s linear infinite;
    z-index: 0;
`

// base level black background
const Options = styled.div`
    width:100%;
    height: 100%;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: .6rem;
    background-color: black;
    position: relative;

`

// content sizing and padding container
const SetupContent = styled.div`
    box-sizing: border-box;
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    position: relative;
    padding: 4rem 0rem;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    z-index: 4;
`

const LogoContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:space-around;
    position: relative;
`
const Img =  styled.img`
    position: relative;
    z-index: 0;
    height:140px;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,.4));

`
const OptionsSectionContainer = styled.div`
    border-top: 1px solid white;
    background-color: rgba(210,210,210,.3);
    flex-grow: 1;
`

const SelectedCategory = styled.div`
    font-weight: bold;
    font-size: 1rem;
    color: white;
`

const BackgroundOverlayBlack = styled.div`
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    position: relative;
    z-index: 1;
`

const BackgroundOverlayColors = styled.div`
    width:100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-size: cover;
    position: relative;
    z-index: 2;
    background: linear-gradient(to bottom, #28f1fcCC, #850dc1);
   
`
const DifficultySlider = styled.input`
    border: 1px solid black;
   &:-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%; 
        background: #4CAF50;
        cursor: pointer;
}

    &:-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
}
`

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
const FormatTypeContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: .8rem 0rem;
    &:hover{
        border: none;
    }
`
const FormatTypeOption = styled.div`
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
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing:border-box;
`
const ContinueButton = styled.button`
    font-size: 1rem;
    padding: 1.8rem 0;
    border: 1px solid rgba(255,255,255,.5);
    border-width: 1px 0 0 1px;
    text-align: center;
    color: white;
    width: 50%;
    background-color: rgba(0,0,0,0);
    font-weight: bold;
    letter-spacing: 6px;
    transition: .2s;
    &:hover{
        font-size: 1.3rem;
        outline: none;
        text-shadow: 2px 2px 8px rgba(255,255,255,.3);
    }
`
const BackButton = styled.button`
    font-size: 1rem;
    padding: 1.8rem 0;
    text-align: center;
    color: white;
    font-weight: bold;
    border: 1px solid rgba(255,255,255,.5);
    border-width: 1px 0px 0px 0px;
    width: 50%;
    background-color: rgba(0,0,0,0);
    letter-spacing: 6px;
    transition: .2s;
    &:hover{
        font-size: 1.3rem;
        outline: none;
        text-shadow: 2px 2px 8px rgba(255,255,255,.3);
    }
    `
const OptionsTitle = styled.h2`
    margin: 1rem auto 2rem auto;
    color:white;
    font-size: 1.4rem;
    letter-spacing: 1rem;
    text-shadow: 2px 2px 6px rgba(0,0,0,.5);
    position: relative;
    z-index: 2;
`
const SelectionTitle = styled.h4`
    margin: 0;
    color:white;
    font-size: .8rem;
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

