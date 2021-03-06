import React from 'react';
import '../styles/registro.css';
import axios from 'axios';
import SignUpIcon from '../images/signUp.png';
import P from './P';
import history from './history';

//Expresiones regulares para la validación del registro de usuario
const validate = values => {
    const errors = {}
    let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\u00f1\u00d1\d]{8,}$/
    let regexName = /^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/
    if(!values.email) {
        errors.email = '↑ Campo obligatorio'
    } else if(!regexEmail.test(values.email)){ 
        errors.email = '↑ Introduce un correo valido (ejemplo: correo@gmail.com)'
    }
    if(!values.nombre){
        errors.nombre = '↑ Campo obligatorio'
    } else if(!regexName.test(values.nombre)){ 
        errors.nombre = '↑ Introduce un nombre valido (Mayuscula al principio y no numeros)'
    }
    if(!values.apellido){
        errors.apellido = '↑ Campo obligatorio'
    } else if(!regexName.test(values.apellido)){ 
        errors.apellido = '↑ Introduce un apellido valido (Mayuscula al principio y no numeros)'
    }
    if(!values.password){
        errors.password = '↑ Campo obligatorio'
    } else if(!regexPassword.test(values.password)){
        errors.password = '↑ Introduce una contraseña valida sin acentos, con al menos 8 caracteres, una minuscula, mayuscula y número'
    }
    return errors;
}

//Componente que nos sirve para poder registrar a un nuevo usuario
class Registro extends React.Component{

    //Estado para poder guardar la información del nuevo usuario
    state = {
        email: "",
        nombre: "",
        apellido: "",
        password: "",
        errors: {}
    }

    //Función principal que envía los datos a registrar en la base de datos a travésde una petición HTTP POST
    addUser = e => {
        e.preventDefault();
        console.log("Objeto a pasar");
        console.log(this.state);
        const { errors, ...sinErrors} = this.state;
        const result = validate(sinErrors);
        console.log("Arreglo es: ", Object.keys(result));
        this.setState({ errors: result});
        if(!Object.keys(result).length){
            axios.post("http://localhost:8080/GraficadoraDeLineas/InsertarUsuario",this.state)
            .then(response => {
                //console.log(`Objeto recibido: ${response.data}`);
                let respuestaServer = response.data;
                let cadenaSeparada = respuestaServer.split(",");
                let idUsuario = cadenaSeparada[0];
                console.log(`TIPO DE IDUSUARIO ES : ${typeof idUsuario}`); 
                console.log(`IDUSUARIO ES : ${idUsuario}`);
                history.push(`/GraficadoraDeLineas/userMainPage?id=${idUsuario}`);
            })
            .catch(error => {
                    console.info(error);
                    console.log("Ha ocurrido un error al insertar el usuario");
            });
        } 
    }

    //Handlers para poder capturar los datos del formulario
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

    //Función render para imprimir el formulario de registro
    render(){
        const { errors } = this.state;
        return (
            <div className="signUpContainer">
                <div className="signUpBox">
                    <img className="signUpIcon" src={SignUpIcon} />
                    <h3>Registro</h3>
                    <form className="formRegistro" onSubmit={this.addUser}>
                        <p>Email</p>
                        <input type="text" name="email" id="email" placeholder="Inserta tu email" className="form-control" onChange={e=>this.handleEmailChange(e.target.value)}/>
                        {errors.email && <P>{errors.email}</P>}
                        <p>Nombre</p>
                        <input type="text" name="nombre" id="nombre" placeholder="Inserta tu nombre" className="form-control" onChange={e=>this.handleNameChange(e.target.value)}/>
                        {errors.nombre && <P>{errors.nombre}</P>}
                        <p>Apellido</p>
                        <input type="text" name="apellido" id="apellido" placeholder="Inserta tu apellido" className="form-control" onChange={e=>this.handleApellidoChange(e.target.value)}/>
                        {errors.apellido && <P>{errors.apellido}</P>}
                        <p>Contraseña</p>
                        <input type="text" name="password" id="password" placeholder="Inserta una contraseña" className="form-control" onChange={e=>this.handlePasswordChange(e.target.value)}/>
                        {errors.password && <P>{errors.password}</P>}
                        <input type="Submit" className="button-submit" value="Registrarme"/>                                 
                    </form>
                </div>
            </div>
        )
    }
}

export default Registro;