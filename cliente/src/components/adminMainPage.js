import React from "react";
import { Table} from "react-bootstrap";
import axios from "axios";
import Usuario from "./usuario";
import history from "./history";
import "../styles/adminMainPage.css";

//Componente tipo clase para la página principal del administrador
class AdminMainPage extends React.Component {

  //Tendremos un estado para obtener el id del administrador y el arreglo de usuarios registrados
  state = {
    id: "",
    data: [],
  };

  /*Cumpliendo con el ciclo de vida del componente vamos a obtener a través de una petición HTTP GET
  y obtendremos el arreglo de usuarios*/
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

  //Función para salir y cerrar sesión
  exit = (e) => {
    history.push(`/GraficadoraDeLineas/`);
  };

  //Función render para imprimir la interfaz de usuario en el navegador
  render() {
    const { data } = this.state;
    return (
      <div className="mainCoontainer">
        <header className="headerr">
          <div className="headerTitlee">Welcome:Admin</div>
          <button className="link" onClick={this.exit}>
            Salir
          </button>
        </header>

        <div>
          <br></br>
        </div>
        <center>
          <div>
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
        </center>
      </div>
    );
  }
}

export default AdminMainPage;
