import React from 'react'
import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import jackie from '../../img/jackiechan.jpg'
import logo from '../../img/setup-logo.svg'
import Config from '../../models/config'
import Footer from '../home/Footer'
import CategorySelect from './CategorySelect'
import Swal from 'sweetalert2'
import colors from '../../values/colors'
import Header from './Header'
import breaker from '../../img/line.svg'
import downchevron from '../../img/downchevron.svg'

export default class GameOptions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categoryList: 0,
            difficulty: "", // old string based system
            length: 20,
            categories: 0,
            format: "",
            selectedCategory: null,
            selectedDifficulty: 1, // new slider/integer based system for difficulty
            selectedFormat: 1, // new slider/integer based system for difficulty
            categoryListToggle: false
        }
        this.populateCategories = this.populateCategories.bind(this)
        this.updateDifficulty = this.updateDifficulty.bind(this)
        this.updateFormat = this.updateFormat.bind(this)
        this.startGame = this.startGame.bind(this)
        this.returnCategoryIndexFromId = this.returnCategoryIndexFromId.bind(this)
        this.changeSelectedDifficulty = this.changeSelectedDifficulty.bind(this)
        this.changeSelectedFormat = this.changeSelectedFormat.bind(this)

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

    // method for slider based difficulty changes
    changeSelectedDifficulty(e){
        let elements = document.getElementsByClassName('selected-difficulty')
        for(let i = 0; i < elements.length; i++){
        elements[i].classList.remove('selected-difficulty')
    }
    this.setState({selectedDifficulty: e.target.value}, function(){
        console.log('Difficulty changed to: ' + this.state.selectedDifficulty )
        
        
    document.getElementById('difficulty-'+this.state.selectedDifficulty).classList.add('selected-difficulty')
    })

    }
    // method for slider based format changes
    changeSelectedFormat(e){
        let elements = document.getElementsByClassName('selected-format')
        for(let i = 0; i < elements.length; i++){
            elements[i].classList.remove('selected-format')
        }
        this.setState({selectedFormat: e.target.value}, function(){
            console.log('Format changed to: ' + this.state.selectedFormat)
            
            
        document.getElementById('format-'+this.state.selectedFormat).classList.add('selected-format')
        })
    }

    // toggle modal for selecting category
    toggleCategoryModal(){
        //create new object with key value pairs of id/name
        this.setState({categoryListToggle: !this.state.categoryListToggle})
        
        
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
    updateCategory = (id) =>{
        this.setState({selectedCategory: id},()=>{
            console.log('Updating Selected Category: '+this.state.selectedCategory)
            this.setState({categoryListToggle: !this.state.categoryListToggle})
        })
        
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
        if (this.state.selectedDifficulty !== "" && this.state.selectedFormat !== "" && this.state.selectedCategory !== 0){
            console.log("Starting game...")
            // create config object
            let newConfig = new Config(this.state.difficulty, this.state.format, this.state.category)
            console.log(newConfig)
            // pass config object up chain to app component function (reference to function passed down as prop: receiveConfig)
            this.props.receiveConfig(newConfig) // will be received in App component as configObject

        }
        else{ // handle invalid config options
            console.log("Not all config options have been specified.")
            console.log(this.state)
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
                    <BackgroundOverlayColors id="setup-background-colors">
                    {/* category list toggle (positioned absolutely above all other components) */}
                    {this.state.categoryListToggle && <CategorySelect categories={this.state.categoryList} updateCategory={this.updateCategory} />}
                    <Header></Header>

                            <SetupContent id="setup-content">
                            <SetupLogoContainer id="title-logo-container">
                                <LogoContainer>
                                    <Img src={logo} alt=""/>
                                </LogoContainer>
                                <OptionsTitle>
                                    GAME SETUP
                                </OptionsTitle>
                            </SetupLogoContainer>

                            <BreakerContainer>
                                <Breaker>
                                    <BreakerLine src={breaker} alt=""/>
                                </Breaker>
                            </BreakerContainer>

                            {/* difficulty select */}
                            <OptionsSectionContainer>
                                <SelectionTitle>DIFFICULTY</SelectionTitle>
                                {/* new slider selection system */}
                                <Input type="range" min='0' max='2' step='1' defaultValue='1' onChange={this.changeSelectedDifficulty} />
                                <DifficultyLabels>
                                    <DifficultyLabelSpan id="difficulty-0">
                                        EASY
                                    </DifficultyLabelSpan>
                                    <DifficultyLabelSpan id="difficulty-1" className="selected-difficulty">
                                        MEDIUM
                                    </DifficultyLabelSpan>
                                    <DifficultyLabelSpan id="difficulty-2">
                                        DIFFICULT
                                    </DifficultyLabelSpan>
                                </DifficultyLabels>

                            </OptionsSectionContainer>

                            <BreakerContainer>
                                <Breaker>
                                    <BreakerLine src={breaker} alt=""/>
                                </Breaker>
                            </BreakerContainer>

                            <OptionsSectionContainer>
                                <SelectionTitle>
                                    FORMAT 
                                </SelectionTitle>
                                {/* new slider based format selection with input range */}
                                <Input type="range" min='0' max='2' step='1' defaultValue='1' onChange={this.changeSelectedFormat} />
                                <FormatLabels>
                                    <FormatLabelSpan id="format-0">
                                        TRUE / FALSE
                                    </FormatLabelSpan>

                                    <FormatLabelSpan id="format-1" className="selected-format">
                                        MIXED
                                    </FormatLabelSpan>

                                    <FormatLabelSpan id="format-2">
                                        MULTIPLE CHOICE
                                    </FormatLabelSpan>
                                </FormatLabels>
                            </OptionsSectionContainer>

                            <BreakerContainer>
                                <Breaker>
                                    <BreakerLine src={breaker} alt=""/>
                                </Breaker>
                            </BreakerContainer>

                            <OptionsSectionContainer>
                            
                                {/* temporary display showing when the list of trivia categories have been received by the client */}
                                <div id="categories-received-message">
                                {
                                    this.state.categoryList !== 0 && <SelectionTitle>CATEGORY</SelectionTitle>
                                }
                                </div>
                                {
                                    this.state.selectedCategory !== null && 
                                    <CategoryButton onClick={this.toggleCategoryModal.bind(this)}>
                                         <SelectedCategory>{this.state.categoryList[this.returnCategoryIndexFromId(this.state.selectedCategory)].name}</SelectedCategory>
                                        <DownChevron>
                                            <img src={downchevron} alt=""/>
                                        </DownChevron>
                                    </CategoryButton>
                                }
                            </OptionsSectionContainer>
                            
                            <BreakerContainer>
                                <Breaker>
                                    <BreakerLine src={breaker} alt=""/>
                                </Breaker>
                            </BreakerContainer>

                            <ButtonContainer>
                                <ContinueButton onClick={this.startGame} className="inactive">
                                    START
                                </ContinueButton>
                            </ButtonContainer>
                        </SetupContent>
                        {/* footer */}
                        
                    </BackgroundOverlayColors>
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




// base level black background
const Options = styled.div`
    width:100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;

`

// content sizing and padding container
const SetupContent = styled.div`
    width:100%;
    height: 100%;
    position: relative;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
`
const SetupLogoContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding-top: 25px;
`
const LogoContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:space-around;
    position: relative;
`
const Img =  styled.img`
    position: relative;
    height:40px;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,.4));

`
const BreakerContainer = styled.div`
    width: 100%;

`
const Breaker = styled.div`
    width: 100%;
    text-align: center;
`
const BreakerLine = styled.img`
    width: 80%;
`

const OptionsSectionContainer = styled.div`
    width: 315px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SelectedCategory = styled.div`
    font-family: LucidaGrande;
    text-transform: uppercase;
    font-size: .8rem;
    padding: .3rem .4rem;
    color: #00D1B7;
    letter-spacing: 5.89px;
    text-align: center;
    text-shadow: 0 0 4px #00D1B7;
`
// input range sliders
const Input = styled.input`
    appearance: none;
    -webkit-appearance: none;
    background: rgba(0,0,0,0.09);
    border-radius: 27px;
    height: 54px;
    border: 1px solid rgba(77,84,83,0.6);
    width: 250px;
    outline: none;
    &::-webkit-slider-thumb{
        -webkit-appearance: none;
        appearance: none;
        width: 46px;
        height: 46px;
        border-radius: 46px;
        border: 1px solid #00D1B7;
        box-shadow: 0 0 12px 3px rgba(102,232,244,0.50), 0 2px 4px 0 rgba(0,0,0,0.50), 0 15px 16px -8px rgba(0,0,0,0.49);
    }
    &::-moz-range-thumb{
        width: 46px;
        height: 46px;
        border-radius: 46px;
        border: 1px solid #00D1B7;
        box-shadow: 0 0 12px 3px rgba(102,232,244,0.50), 0 2px 4px 0 rgba(0,0,0,0.50), 0 15px 16px -8px rgba(0,0,0,0.49);
    }

`
// format slider labels
const FormatLabels = styled.div`
    width: 250px;
    margin: 0 auto;
    height:25px;
    list-style: none;
    margin-bottom: 1rem;
    display:flex;
    flex-direction: row;
`
const FormatLabelSpan = styled.div`
    flex-grow: 1;
    width: calc(250px / 3);
    font-family: LucidaGrande-Bold;
    font-size: 11px;
    height: 25px;
    overflow:visible;
    color: #484B4A;
    margin-top: 1rem;
    float: left;
    letter-spacing: 0.79px;
    text-align: center;
    &.selected-format{
        font-family: LucidaGrande-Bold;
        font-size: 14px;
        color: #00D1B7;
        letter-spacing: 1.01px;
        text-align: center;
        transition: .2s linear;
        text-shadow: 0 0 12px rgba(102,232,244,.5);
    }
`
// difficulty option labels
const DifficultyLabels = styled.div`
    width: 250px;
    margin: 0 auto;
    height:25px;
    list-style: none;
    display:flex;
    flex-direction: row;
    margin-bottom: 1rem;

`
const DifficultyLabelSpan = styled.div`
    flex-grow: 1;
    width: calc(250px / 3);
    font-family: LucidaGrande-Bold;
    font-size: 11px;
    height: 25px;
    overflow:visible;
    color: #484B4A;
    margin-top: 1rem;
    float: left;
    letter-spacing: 0.79px;
    text-align: center;
    &.selected-difficulty{
        font-family: LucidaGrande-Bold;
        font-size: 14px;
        color: #00D1B7;
        letter-spacing: 1.01px;
        text-align: center;
        transition: .2s linear;
        text-shadow: 0 0 12px rgba(102,232,244,.5);
    }
`

const BackgroundOverlayColors = styled.div`
    width:100%;
    min-height:100%;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    background: linear-gradient(-134deg, ${colors.backgroundPrimary} 0%, ${colors.backgroundSecondary} 37%, ${colors.backgroundThird} 100%);
    `




const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
    align-items: center;
    box-sizing:border-box;
    margin-top: 4rem;
    
`
const ContinueButton = styled.button`
    padding: 1.8rem 0;
    text-align: center;
    transition: .2s;
    font-family: LucidaGrande;
    font-size: 18px;
    color: #00D1B7;
    letter-spacing: 5.89px;
    text-align: center;
    text-shadow: 0 0 4px #00D1B7;
    border: none;
    width: 250px;
    background: rgba(0,0,0,0.10);
    border-radius: 6px;
    padding: 2rem 0;
    width:100%;
    &:active,:visited,:hover{
        outline: none;
    }
`

const OptionsTitle = styled.h2`
    margin: 1rem auto 1rem auto;
    text-shadow: 2px 2px 6px rgba(0,0,0,.5);
    position: relative;
    font-family: LucidaGrande;
    font-size: .8rem;
    color: #00D1AE;
    letter-spacing: 6.34px;
    text-align: center;
`
const SelectionTitle = styled.h4`
    font-weight: bolder;
    position: relative;
    width: 250px;
    margin: 1rem auto 1rem auto;
    text-shadow: 2px 2px 6px rgba(0,0,0,.4);
    font-family: LucidaGrande-Bold;
    font-size: 11px;
    color: #00B3CC;
    letter-spacing: 4.29px;
    text-align: left;

`

const CategoryButton = styled.button`
    border: 1px solid rgba(77,84,83,0.28);
    width: 250px;
    outline:none;
    background: rgba(0,0,0,0.10);
    border-radius: 6px;
    padding: 10px 0;
    &:active,:visited,:hover{
        outline: none;
    }
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

// icons
const DownChevron = styled.div`
    display:flex;
    justify-content: space-around;
`