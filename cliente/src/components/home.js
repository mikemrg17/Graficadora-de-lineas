import React from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import Ecuacionrecta from '../images/Ecuación_recta.jpg'

//Componente para poder imprimir la pantalla de inicio del sistema
const Home = () => {
    return (
        <div className="home-container">
            <img className="imagen" src={Ecuacionrecta} />
            <div className="head">
                <h1>Graficadora de rectas</h1>    
            </div>
            <div className="actions">
                <div className="text">¿Ya tienes una cuenta? </div>
                <Link to="/GraficadoraDeLineas/login" className="button_slide slide_down">Inicia Sesion</Link>
                <div className="text">¿No tienes una cuenta?</div>
                <Link to="/GraficadoraDeLineas/registro" className="button_slide slide_down">Registrate</Link>
            </div>
        </div>
    )
}

export default Home;