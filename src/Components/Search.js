import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import '../main.css';
import history from '../history';

class Search extends React.Component{
    constructor(props) {
        super(props);

        this.state = {term: ''};
    }
    onInputInput = (e) => {
        this.setState({term: e.target.value})
    }
    onFormSubmit = async (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: `/search/${this.state.term}`,
        });
    }
    render() {
        return (     
            <div className="landing-cover">
               <form onSubmit={this.onFormSubmit} className="search-container">
                   <label htmlFor="term">Search for a recipe</label>   
                   <div className="flex">
                        <input onInput={this.onInputInput} id="term" type="text"/>
                        <input type="submit" value="Go" />
                   </div>
               </form>
               <div className="pattern"></div>
            </div>
        );
    }
}
Search = withRouter(Search);
export default Search;