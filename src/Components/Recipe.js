import React from 'react';
import { withRouter } from 'react-router-dom';
import request from 'request';
import cheerio from 'cheerio';

class Recipe extends React.Component{
    constructor(props) {
        super(props);

        this.state = {recipe: []}
    }
    componentDidMount = async () => {
        var pathArray = this.props.history.location.recipe.url.split( '/' );
        var protocol = pathArray[0];
        var host = pathArray[2];
        var url = protocol + '//' + host;
        let data = [];
        if(host == 'www.marthastewart.com'){
            console.log(1);
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = this.props.history.location.recipe.url;
            fetch(proxyurl + url)
            .then(response => {
                return response.text()
            })
            .then(html => {
                // console.log(html);
                const $ = cheerio.load(html);
                const ps = $('.section-body .paragraph p');
                ps.each((i,p) => {
                    console.log($(p).text());
                    data.push($(p).text());
                });
                this.setState({recipe: data})
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?")) 
        }
        else if(host == 'www.cookstr.com'){
            console.log(2);
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = this.props.history.location.recipe.url;
            fetch(proxyurl + url)
            .then(response => {
                return response.text()
            })
            .then(html => {
                // console.log(html);
                const $ = cheerio.load(html);
                const ps = $('.stepByStepInstructionsDiv .articleAttrSection p');
                ps.each((i,p) => {
                    data.push($(p).text())
                });
                this.setState({recipe: data})
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?")) 
        }
        else if(host == 'www.simplyrecipes.com'){
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = this.props.history.location.recipe.url;
            fetch(proxyurl + url)
            .then(response => {
                return response.text()
            })
            .then(html => {
                // console.log(html);
                const $ = cheerio.load(html);
                const ps = $('#sr-recipe-method div p');
                ps.each((i,p) => {
                    console.log($(p).text());
                });
                this.setState({recipe: data})
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?")) 
        }
    }
    getIngredients = () => {
        return this.props.history.location.recipe.ingredients.map(ingredient => {
            return (
                <div className="ingredient flex">
                    <div className="ingredient-img">       
                        <img src={ingredient.image} />
                    </div>
                    <div className="ingredient-info">
                        <h3>{ingredient.text}</h3>
                        <p>{(Math.round(ingredient.weight * 100)) / 100 + 'g' }</p>
                    </div>
                </div>
            );
        })
    }
    getRecipe = () => {
        console.log(this.state.recipe);
        return (
            this.state.recipe.map(step => {
                return (
                <li>{step}</li>
                );
            })
        );
    }
    render() {
        return(
            <div className="recipe">
                <h1 className="title" style={{fontSize: '4vmin'}}>{this.props.history.location.recipe.label}</h1>       
                <img className="recipe-img" src={this.props.history.location.recipe.image} />     
                <h2 className="title">Ingredients:</h2>
                <div className="ingredients">
                    {this.getIngredients()}    
                </div>
                <h2 className="title">Recipe</h2>  
                <a href={this.props.history.location.recipe.url}>{this.props.history.location.recipe.url}</a>  
                <ul style={{margin: '3vmin 0'}}>{this.getRecipe()}</ul>
            </div>
        );
    }
}

Recipe = withRouter(Recipe);
export default Recipe;