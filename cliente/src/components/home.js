import React from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="mainContainer">
            <div className="login"></div>
            <h1>Inicio de sesión</h1>   
            <hr />
            <div className="registro">
                <div>¿No estás registrado?</div>
                <Link to="/GraficadoraDeLineas/registro" className="button_slide slide_down">Registro</Link>
            </div>
        </div>
    )
}

export default Home;