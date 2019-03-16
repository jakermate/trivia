import React from 'react'
import styled from 'styled-components'

export default class HomeOptions extends React.Component{

    constructor(){
        super();
        this.state = {
            categories: 0,
            difficulty: "easy",
            length: 10
        }
        this.populateCategories = this.populateCategories.bind(this)
        const CategorySelect = styled.div`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        `;
        const CategoryCell = styled.div`
            width: 33.33%
        `;

    }

    // run as callback function when the category data is fetched and pushed into the component's state
    populateCategories(){
        console.log("Building category select table from json")
        console.log(this.state.categories)
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
                {/* temporary display showing when the list of trivia categories have been received by the client */}
                <div id="categories-received-message">
                {
                    this.state.categories != 0 && <div>Categories received from api</div>
                }
                </div>
            
             
                 {/* categories table (select 3 categories out of the list for the test to consist of) */}
                {this.state.categories != 0 && 
                    <div id="category-select">
                        <div id="category-flex">
                         {/* use map function to display a table cell for each category in array */}
                         {this.state.categories.map(function(category){
                             return(
                                 <div id="category-cell">
                                     {category.name}
                                 </div>
                             )
                         })}
                     </div>
                 </div>
                }
               
            </div>
        )
     }
    
}