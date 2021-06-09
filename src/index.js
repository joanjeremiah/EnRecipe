import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Switch,withRouter } from 'react-router-dom';

import Search from './Components/Search';
import SearchResults from './Components/SearchResults';
import Index from './Components/index';
import Recipe from './Components/Recipe';
import Footer from './Components/Footer';
import history from './history';

class App extends React.Component{
    render() {
        return (
            <>
                <Router history={history}>
                    <Search />
                    <Switch>
                        <Route path="/" exact>
                            <Index />
                        </Route>
                        <Route path="/search/:recipe" exact>
                            <SearchResults />
                        </Route>
                        <Route path="/recipe/:recipeLabel" exact>
                            <Recipe />
                        </Route>
                    </Switch>
                    <Footer />
                </Router>
            </>
        );
    }
}

ReactDOM.render(<App />,document.querySelector('#root'));