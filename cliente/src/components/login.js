import React from 'react';
import '../styles/registro.css';
import axios from 'axios';

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
            let validacion = cadenaSeparada[2];
            console.log(`TIPO DE IDUSUARIO ES : ${typeof idRol}`); 
            console.log(`IDUSUARIO ES : ${idUsuario}`);
            console.log(`USUARIO ES : ${idRol}`);
            console.log(`VALIDACION ES : ${validacion}`);
            history.push('/GraficadoraDeLineas/userMainPage');
        })
        .catch(error => {
                console.info(error);
                console.log("Ha ocurrido un error al iniciar sesion");
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
            <div className="mainContainerR">
                <h1 className="title">Inicio de sesion</h1>
                <div>
                    <form className="formInsertar" onSubmit={this.logUser}>
                        <input type="text" name="email" id="email" placeholder="Email" className="form-control mb-2" onChange={e=>this.handleEmailChange(e.target.value)}/>
                        <input type="password" name="password" id="password" placeholder="Password" className="form-control mb-2" onChange={e=>this.handlePasswordChange(e.target.value)}/>
                        <input type="Submit" name="isesion" id="isesion" value="Iniciar Sesion"/>
                    </form>
                </div>
            </div>
        )
    }


}

export default Login;