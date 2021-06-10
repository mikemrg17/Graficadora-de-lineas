import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from './home';
import Registro from './registro';


function App(){
    return (
            <Router>
                <Switch>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/registro">
                        <Registro />
                    </Route>
                    <Route path="*" render={() => window.location.href = "/home"}/>
                </Switch>
            </Router>
    );
}
export default App;