import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Usuario from "./usuario";
class AdminMainPage extends React.Component {
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
        .get(`http://localhost:8080/GraficadoraDeLineas/DatosUsuario?id=${qId}`)
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
        <div className="headerUserMainPage">This is a header</div>
        <div className="contentUserMainPage">This is the content</div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((nombre) => {
              return <Usuario {...nombre} />;
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AdminMainPage;
