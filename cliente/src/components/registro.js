import React from 'react';
//import '../styles/registro.css';
import axios from 'axios';

class Registro extends React.Component{

    state = {
        email: "",
        nombre: "",
        apellido: "",
        password: ""
    }


    addUser = e => {
        e.preventDefault();
        alert("Se insertará el usuario ");
        console.log("Objeto a pasar");
        console.log(this.state);
        axios.post("http://localhost:8080/GraficadoraDeLineas/InsertarUsuario",this.state)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
                console.info(error);
                console.log("Ha ocurrido un error al insertar el usuario");
        });
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
            <div className="mainContainer">
                <h1 className="title">Registro</h1>
                <form className="formRegistro" onSubmit={this.addUser}>
                    <input type="text" name="email" id="email" placeholder="Inserta tu email" classname="form-control mb-2" onChange={e=>this.handleEmailChange(e.target.value)}/>
                    <input type="text" name="nombre" id="nombre" placeholder="Inserta tu nombre" classname="form-control mb-2" onChange={e=>this.handleNameChange(e.target.value)}/>
                    <input type="text" name="apellido" id="apellido" placeholder="Inserta tu apellido" classname="form-control mb-2" onChange={e=>this.handleApellidoChange(e.target.value)}/>
                    <input type="text" name="password" id="password" placeholder="Inserta una contraseña" classname="form-control mb-2" onChange={e=>this.handlePasswordChange(e.target.value)}/>
                    <div className="d-grid gap-2">
                            <input type="Submit" className="secondary" value="Insertar"/>                                 
                    </div>
                </form>
            </div>
        )
    }
}

export default Registro;