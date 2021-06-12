import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import Home from './home';
import Login from "./login";
import Registro from './registro';
import UserMainPage from "./userMainPage";

const App = () => {
    return (
            <div>
                <Switch>
                    <Route exact path="/GraficadoraDeLineas/">
                        <Home />
                    </Route>
                    <Route exact path="/GraficadoraDeLineas/registro">
                        <Registro />
                    </Route>
                    <Route exact path="/GraficadoraDeLineas/login">
                        <Login />
                    </Route>
                    <Route exact path="/GraficadoraDeLineas/userMainPage">
                        <UserMainPage />
                    </Route>
                    <Route path="*" render={() => window.location.href = "/GraficadoraDeLineas/"}/>
                </Switch>
            </div>
    );
}
export default App;