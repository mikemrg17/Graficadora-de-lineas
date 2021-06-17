import React from 'react';
import '../styles/login.css';
import axios from 'axios';
import Avatar from '../images/avatar.png'
import { Link } from 'react-router-dom';
import P from './P';
import history from './history';

const validate = values => {
    const errors = {}
    if(!values.email){
        errors.email = '↑ Campo obligatorio'
    }
    if(!values.password){
        errors.password = '↑ Campo obligatorio'
    }
    return errors;
}

class Login extends React.Component{

    state = {
        email: "",
        password: "",
        errors: {}
    }

    logUser = e => {
        e.preventDefault();
        console.log("Objeto a pasar");
        console.log(this.state);
        const { errors, ...sinErrors} = this.state;
        const result = validate(sinErrors);
        console.log("Arreglo es: ", Object.keys(result));
        this.setState({ errors: result});
        if(!Object.keys(result).length){
             //Enviar fomrulario
             console.log("Formulario enviado");
             axios.post("http://localhost:8080/GraficadoraDeLineas/IniciarSesion",this.state)
            .then(response => {
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
                alert("Usuario y/o contraseña incorrectos");
                form.reset();
                console.log("Ha ocurrido un error al iniciar sesion");
            });
        }
        
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
        const { errors } = this.state
        return (
            <div className="login-container">               
                <div className="loginbox">
                    <img className="avatar" src={Avatar} />
                    <h3>Inicio de Sesión</h3>
                    <form className="formlogin" id="form" onSubmit={this.logUser}>
                        <p>Usuario</p>
                        <input type="text" name="email" id="email" placeholder="Correo electronico" className="form-control" onChange={e=>this.handleEmailChange(e.target.value)}/>
                        {errors.email && <P>{errors.email}</P>}
                        <p>Contraseña</p>
                        <input type="password" name="password" id="password" placeholder="Contraseña" className="form-control" onChange={e=>this.handlePasswordChange(e.target.value)}/>
                        {errors.password && <P>{errors.password}</P>}
                        <input type="Submit" name="isesion" id="isesion" className="button-submit" value="Iniciar Sesion"/>
                    </form>
                    <Link to="/GraficadoraDeLineas/registro" className="reef">¿No tienes una cuenta? Registrate</Link>
                </div>
            </div>
        )
    }


}

export default Login;