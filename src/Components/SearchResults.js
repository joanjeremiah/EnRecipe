import React from 'react';
import Search from './Search';
import 'react-router-dom';
import { withRouter } from 'react-router-dom';

import RecipeCard from './RecipeCard';

const APP_ID = "5356d460" || "d8d81cc0";
const APP_KEY = "000e634ee221f3cc3fe235e57022402b" || "9ba40bc84389dcda120a5b481c148fdb";

class SearchResults extends React.Component{
    constructor(props) {
        super(props);
        this.state = {recipes: []}
    }
    componentDidMount() {
        this.getRecipes(this.props.match.params.recipe);

    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.recipe !== prevProps.match.params.recipe) {
            this.getRecipes(this.props.match.params.recipe);
        }
    }
    setRecipeCards = () => {
        return this.state.recipes.map (recipe => {
            return <RecipeCard recipe = {recipe} key ={recipe.recipe.label}/>
        })
    }
    getRecipes = async (searchTerm) => {      
        const response = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const data = await response.json();
        this.setState({recipes: data.hits});
    }
    render() {
        return(
            <div className="recipe-cards">
                {this.setRecipeCards()}
            </div>
        );   
    }
};

SearchResults = withRouter(SearchResults);
export default SearchResults;