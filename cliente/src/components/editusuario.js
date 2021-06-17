import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import history from "./history";
import "../styles/adminMainPage.css";
import P from './P';

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

class Editusuario extends React.Component {
  state = {
    idUsuario: "",
    email: "",
    nombre: "",
    apellido: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    const qId = new URLSearchParams(window.location.search).get("id");
    this.setState({ idUsuario: qId });

    if (qId) {
      console.log("Se recibió el parámetro de id");
      axios
        .get(`http://localhost:8080/GraficadoraDeLineas/UsuarioSol?id=${qId}`)
        .then((response) => {
          const newusuario = response.data[0];
          this.setState({ ...newusuario });
          console.log("datos obtenidos");
        })
        .catch((error) => {
          console.error(error);
          alert("Ha ocurrido un error al obtener los usuarios");
        });
    } else {
      console.log("No se recibió el parámetro de id");
    }
  }
  EmailChange = (value) => {
    value ? console.log("Aceptado") : console.log("No aceptado");
    this.setState(
      {
        email: value,
      },
      console.log(this.state.email)
    );
  };

  NameChange = (value) => {
    value ? console.log("Aceptado") : console.log("No aceptado");
    this.setState(
      {
        nombre: value,
      },
      console.log(this.state.nombre)
    );
  };
  SurnameChange = (value) => {
    value ? console.log("Aceptado") : console.log("No aceptado");
    this.setState(
      {
        apellido: value,
      },
      console.log(this.state.apellido)
    );
  };
  PasswordChange = (value) => {
    value ? console.log("Aceptado") : console.log("No aceptado");
    this.setState(
      {
        password: value,
      },
      console.log(this.state.password)
    );
  };

  Editarusuario = (e) => {
    e.preventDefault();
    alert("Se editarán los cambios");
    console.log("Objeto a pasar");
    console.log(this.state);
    const { errors, ...sinErrors} = this.state;
    const result = validate(sinErrors);
    console.log("Arreglo es: ", Object.keys(result));
    this.setState({ errors: result});
    if(!Object.keys(result).length){
      axios.post("http://localhost:8080/GraficadoraDeLineas/EditarUsuario", this.state)
        .then((response) => {
          console.log(response);
          history.goBack();
        })
        .catch((error) => {
          console.info(error);
          console.log("Ha ocurrido un error al mandar los datos");
        });
    }
  }
    back = (e) => {
      history.goBack();
    };

  render() {
    const { errors } = this.state;
    return (
      <div className="mainCoontainer">
        <header className="headerr">
          <div className="headerTitlee">Welcome:Admin</div>
          <button className="link" onClick={this.back}>
            Regresar
          </button>
        </header>
        <center>
          <h1 className="titlee">Información del usuario</h1>

          <form className="formEditarUsario" onSubmit={this.Editarusuario}>
            Email:{" "}
            <input
              type="text"
              name="nombre"
              value={this.state.email}
              onChange={(e) => this.EmailChange(e.target.value)}            
            />
            {errors.email && <P>{errors.email}</P>}
            <br></br>
            Nombre:{" "}
            <input
              type="text"
              name="nombre"
              value={this.state.nombre}
              onChange={(e) => this.NameChange(e.target.value)}
              required
            />
             {errors.nombre && <P>{errors.nombre}</P>}
            <br></br>
            Apellido:{" "}
            <input
              type="text"
              name="nombre"
              value={this.state.apellido}
              onChange={(e) => this.SurnameChange(e.target.value)}
              required
            />
            {errors.apellido && <P>{errors.apellido}</P>}
            <br></br>
            Password:{" "}
            <input
              type="text"
              name="nombre"
              value={this.state.password}
              onChange={(e) => this.PasswordChange(e.target.value)}
              required
            />
            {errors.password && <P>{errors.password}</P>}
            <br></br>
            <br></br>
            <input type="Submit" value="Editar Usuario" className="linkk2" />
          </form>
        </center>
      </div>
    );
  }
}

export default Editusuario;
