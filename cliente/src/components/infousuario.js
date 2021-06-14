import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import Despinfo from "./despinfo";

class Infousuario extends React.Component {
  state = {
    id: "",
    data: [],
  };
  componentDidMount() {
    const qId = new URLSearchParams(window.location.search).get("id");
    this.setState({ id: qId });
    if (qId) {
      console.log("Se recibió el parámetro de id");
      axios
        .get(`http://localhost:8080/GraficadoraDeLineas/UsuarioSol?id=${qId}`)
        .then((response) => {
          console.log("Response data: " + response.data);
          this.setState({ data: response.data });
          console.log(this.state.data);
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
    const { data } = this.state;
    return (
      <div className="mainContainerR">
        <div className="headerUserMainPage">Información de los usuarios</div>
        <table striped bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {data.map((nombre) => {
              return <Despinfo {...nombre} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Infousuario;
