import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
    this.setState({ id: qId });
    if (qId) {
      console.log("Se recibió el parámetro de id");
      axios
        .get(`http://localhost:8080/GraficadoraDeLineas/UsuarioSol?id=${qId}`)
        .then((response) => {
          const question = response.data[0];
          this.setState({ ...question });
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
  render() {
    const { idUsuario, email, nombre, apellido, password } = this.state;
    return (
      <Container className="MarginContainer">
        <h3>Informacion del usuario</h3>

        <form className="formEditar">
          nombre: <input type="text" name="nombre" value={this.state.nombre} />
          <input type="Submit" className="secondary" value="Editar" />
        </form>
      </Container>
    );
  }
}

export default Editusuario;
