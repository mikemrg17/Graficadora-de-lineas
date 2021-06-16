import React from 'react';
import '../styles/login.css';
import axios from 'axios';
import Avatar from '../images/avatar.png'

import history from './history';

class Login extends React.Component{

    state = {
        email: "",
        password: ""
    }

    logUser = e => {
        e.preventDefault();
        //alert("Se iniciará sesion");
        console.log("Objeto a pasar");
        console.log(this.state);
        axios.post("http://localhost:8080/GraficadoraDeLineas/IniciarSesion",this.state)
        .then(response => {
            //console.log(`La información recibida es: ${response.data}`);
            let respuestaServer = response.data;
            let cadenaSeparada = respuestaServer.split(",");
            let idUsuario = cadenaSeparada[0];
            let idRol = cadenaSeparada[1];
            let validacion = cadenaSeparada[2].toString();

            if( idRol == 2 && validacion == "true"){
                console.log(`TIPO DE IDUSUARIO ES : ${typeof idRol}`); 
                console.log(`IDUSUARIO ES : ${idUsuario}`);
                console.log(`USUARIO ES : ${idRol}`);
                console.log(`VALIDACION ES : ${validacion}`);
                history.push(`/GraficadoraDeLineas/userMainPage?id=${idUsuario}`);
            }else if(idRol == 1 && validacion=="true"){
                history.push(`/GraficadoraDeLineas/adminMainPage?id=${idUsuario}`);
            }
        })
        .catch(error => {
                alert("No estás registrado, se te mandará a registrarte");
                console.log("Ha ocurrido un error al iniciar sesion");
                history.push('/GraficadoraDeLineas/registro');
        });
    }

    handleEmailChange = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            email: value
        },console.log(this.state.email));
    }

    handlePasswordChange = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            password: value
        },console.log(this.state.password));
    }

    render(){
        return (
            <div className="login-container">               
                <div className="loginbox">
                    <img className="avatar" src={Avatar} />
                    <h3>Inicio de Sesión</h3>
                    <form className="formInsertar" onSubmit={this.logUser}>
                        <p>Usuario</p>
                        <input type="text" name="email" id="email" placeholder="Correo electronico" className="form-control" onChange={e=>this.handleEmailChange(e.target.value)}/>
                        <p>Contraseña</p>
                        <input type="password" name="password" id="password" placeholder="Contraseña" className="form-control" onChange={e=>this.handlePasswordChange(e.target.value)}/>
                        <input type="Submit" name="isesion" id="isesion" className="button-submit" value="Iniciar Sesion"/>
                    </form>
                </div>
            </div>
        )
    }


}

export default Login;