import React from 'react';
import {Link } from 'react-router-dom';

class RecipeCard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className="recipe-card">
                <div className="recipe-card-img">
                    <img alt="" src={this.props.recipe.recipe.image} />
                </div>           
                <div className="recipe-card-info">
                    <h1>{this.props.recipe.recipe.label}</h1>
                    <div className="flex responsive-flex" style={{justifyContent: 'space-between',margin: '2vmin 0'}}>
                        <h3>Calories: {Math.round(this.props.recipe.recipe.calories)}</h3>
                        <Link to={{pathname: `/recipe/${this.props.recipe.recipe.label}`, recipe: this.props.recipe.recipe}}>
                            <a onClick={this.onAClick} href="/"><h3>View recipe >></h3></a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeCard;