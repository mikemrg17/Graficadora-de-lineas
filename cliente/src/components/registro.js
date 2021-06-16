import React from 'react';
import '../styles/registro.css';
import axios from 'axios';
import SignUpIcon from '../images/signUp.png';
import history from './history';

class Registro extends React.Component{

    state = {
        email: "",
        nombre: "Anónimo",
        apellido: "Anónimo",
        password: ""
    }


    addUser = e => {
        e.preventDefault();

        if (this.state.email == "" && this.state.password == "") {
            alert("Debes de llenar mínimo el campo de email y de contraseña");
        }else if(this.state.email == "" || this.state.password == ""){
            alert("Debes de llenar mínimo el campo de email y de contraseña");
        } else {
            //alert("Se insertará el usuario ");
        console.log("Objeto a pasar");
        console.log(this.state);
        axios.post("http://localhost:8080/GraficadoraDeLineas/InsertarUsuario",this.state)
        .then(response => {
            //console.log(`Objeto recibido: ${response.data}`);
            let respuestaServer = response.data;
            let cadenaSeparada = respuestaServer.split(",");
            let idUsuario = cadenaSeparada[0];
            console.log(`TIPO DE IDUSUARIO ES : ${typeof idUsuario}`); 
            console.log(`IDUSUARIO ES : ${idUsuario}`);
            history.push('/GraficadoraDeLineas/userMainPage');
        })
        .catch(error => {
                console.info(error);
                console.log("Ha ocurrido un error al insertar el usuario");
        });
        } 
    }

    handleEmailChange = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            email: value
        },console.log(this.state.email));
    }

    handleNameChange = (value) =>{
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            nombre: value
        },console.log(this.state.nombre));
    }

    handleApellidoChange = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            apellido: value
        },console.log(this.state.apellido));
    }

    handlePasswordChange = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            password: value
        },console.log(this.state.password));
    }

    render(){
        return (
            <div className="signUpContainer">
                <div className="signUpBox">
                    <img className="signUpIcon" src={SignUpIcon} />
                    <h3>Registro</h3>
                    <form className="formRegistro" onSubmit={this.addUser}>
                        <p>Email</p>
                        <input type="text" name="email" id="email" placeholder="Inserta tu email" className="form-control" onChange={e=>this.handleEmailChange(e.target.value)}/>
                        <p>Nombre</p>
                        <input type="text" name="nombre" id="nombre" placeholder="Inserta tu nombre" className="form-control" onChange={e=>this.handleNameChange(e.target.value)}/>
                        <p>Apellido</p>
                        <input type="text" name="apellido" id="apellido" placeholder="Inserta tu apellido" className="form-control" onChange={e=>this.handleApellidoChange(e.target.value)}/>
                        <p>Contraseña</p>
                        <input type="text" name="password" id="password" placeholder="Inserta una contraseña" className="form-control" onChange={e=>this.handlePasswordChange(e.target.value)}/>
                        <input type="Submit" className="button-submit" value="Registrarme"/>                                 
                    </form>
                </div>
            </div>
        )
    }
}

export default Registro;