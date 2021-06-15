import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import history from "./history";

class Editusuario extends React.Component {
  state = {
    idUsuario: "",
    email: "",
    nombre: "",
    apellido: "",
    password: "",
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
    axios
      .post(
        "http://localhost:8080/GraficadoraDeLineas/EditarUsuario",
        this.state
      )
      .then((response) => {
        console.log(response);
        history.goBack();
      })
      .catch((error) => {
        console.info(error);
        console.log("Ha ocurrido un error al mandar los datos");
      });
  };

  render() {
    return (
      <div className="mainContainerR">
        <h1 className="title">Informacion del usuario</h1>

        <form className="formEditarUsario" onSubmit={this.Editarusuario}>
          email:{" "}
          <input
            type="text"
            name="nombre"
            value={this.state.email}
            onChange={(e) => this.EmailChange(e.target.value)}
          />
          nombre:{" "}
          <input
            type="text"
            name="nombre"
            value={this.state.nombre}
            onChange={(e) => this.NameChange(e.target.value)}
          />
          apellido:{" "}
          <input
            type="text"
            name="nombre"
            value={this.state.apellido}
            onChange={(e) => this.SurnameChange(e.target.value)}
          />
          password:{" "}
          <input
            type="text"
            name="nombre"
            value={this.state.password}
            onChange={(e) => this.PasswordChange(e.target.value)}
          />
          <input type="Submit" className="secondary" value="Editar Usuario" />
        </form>
      </div>
    );
  }
}

export default Editusuario;
