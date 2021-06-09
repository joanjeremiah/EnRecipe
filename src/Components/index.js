import React from 'react';

import RecipeCard from './RecipeCard'

const APP_ID = "d8d81cc0" || "5356d460"  ;
const APP_KEY = "9ba40bc84389dcda120a5b481c148fdb" || "000e634ee221f3cc3fe235e57022402b" ;

class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {recipes: []};
    }
    componentDidMount = () =>  {
        this.getRecipes();   
    }
    getRecipes = async () => {      
        let list1 = ['chinese','indian','mexican','italian','thai','french'] ;
        const randItem = list1[Math.floor(Math.random() * list1.length)];
        const response = await fetch(`https://api.edamam.com/search?q=${randItem}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const data = await response.json();
        this.setState({recipes: data.hits});
        
    }
    setRecipeCards = () => {
        return this.state.recipes.map (recipe => {
            return <RecipeCard recipe = {recipe} key ={recipe.recipe.label}/>
        })
    }
    render() {
        return (
            <div className="recipe-cards">
                {this.setRecipeCards()}
            </div>
        );
    }
}

export default Index;