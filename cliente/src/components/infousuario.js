import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import axios from "axios";
import Despinfo from "./despinfo";
import "../styles/adminMainPage.css";
import history from "./history";

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
  back = (e) => {
    history.goBack();
  };

  render() {
    const { data } = this.state;
    return (
      <div className="mainCoontainer">
        <header className="headerr">
          <div className="headerTitlee">Welcome:Admin</div>
          <button className="link" onClick={this.back}>
            Regresar
          </button>
        </header>
        <center>
          <div className="titlee">
            <h1>Información del usuario</h1>
          </div>
          <Table
            striped
            bordered
            hover
            variant="dark"
            responsive
            className="tableUsuarios"
          >
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
          </Table>
        </center>
      </div>
    );
  }
}

export default Infousuario;
