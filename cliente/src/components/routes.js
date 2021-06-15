import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Registro from "./registro";
import UserMainPage from "./userMainPage";
import AdminMainPage from "./adminMainPage";
import AddEjercicio from "./addEjercicio";
import Infousuario from "./infousuario";
import Editusuario from "./editusuario";
//import Canvas from './canvas';
import ProbarEjercicio from "./probarEjercicio";

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
                    <Route exact path="/GraficadoraDeLineas/probarEjercicio">
                        <ProbarEjercicio/>
                    </Route>
                    <Route exact path="/GraficadoraDeLineas/adminMainPage">
                        <AdminMainPage />
                    </Route>
                    <Route exact path="/GraficadoraDeLineas/addEjercicio">
                        <AddEjercicio />
                    </Route>
                    <Route exact path="/GraficadoraDeLineas/infousuario">
                        <Infousuario />
                    </Route>
                    <Route exact path="/GraficadoraDeLineas/editusuario">
                        <Editusuario />
                    </Route>
                    <Route path="*" render={() => window.location.href = "/GraficadoraDeLineas/"}/>
                </Switch>
            </div>
    );
}
export default App;

