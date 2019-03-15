import React from 'react'


export default class HomeOptions extends React.Component{

    constructor(){
        super();
        this.state = {
            categories: 0,
            difficulty: "easy",
            length: 10
        }
    }

    // run as callback function when the category data is fetched and pushed into the component's state
    populateCategories(json){
        console.log("Building categorie select table from json")
        console.log(json.trivia_categories.length)
    }



    componentDidMount(){
        // fetch list of categories when the component mounts
        fetch('https://opentdb.com/api_category.php').then((res)=>{
            return res.json()
        }).then((json)=>{
            // store categories in state
            this.setState({categories: json}, this.populateCategories(json))
            console.log(this.state.categories)
            
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
                <div id="category-select">
                
                </div>
            </div>
        )
     }
    
}