import React from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import Ecuacionrecta from '../images/Ecuación_recta.jpg'

const Home = () => {
    return (
        <div className="home-container">
            <img className="imagen" src={Ecuacionrecta} />
            <div className="head">
                <h1>Home</h1>    
            </div>
            <div className="actions">
                <div className="text">¿Ya tienes una cuenta? </div>
                <Link to="/GraficadoraDeLineas/login" className="button_slide slide_down">Inicia Sesion</Link>
                <div className="text">¿No estás registrado?</div>
                <Link to="/GraficadoraDeLineas/registro" className="button_slide slide_down">Registro</Link>
            </div>
        </div>
    )
}

export default Home;