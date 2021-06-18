import React from "react";
import "../styles/probarEjercicio.css";
import Canvas from "./canvas";
import axios from "axios";
import history from "./history";

//Componente para poder probar el ejercicio, también para mostrar la gráfica
class ProbarEjercicio extends React.Component {
  
  //Estado de los datos del ejercicio
  state = {
    ejercicio: [],
  };

  //Función para volver a la página anterior
  back = (e) => {
    history.goBack();
  };

  //Función del ciclo de vida del componente para poder obtener la información a través del id del ejercicio
  componentDidMount() {
    const qId = new URLSearchParams(window.location.search).get("idEjercicio");
    this.setState({ idEjercicio: qId });
    if (qId) {
      console.log("Se recibió el parámetro de id");
      axios
        .get(
          `http://localhost:8080/GraficadoraDeLineas/SolicitarEjercicio?idEjercicio=${qId}`
        )
        .then((response) => {
          console.log("Response data: " + response.data);
          //const ejerciciosJSON = JSON.parse(response.data);
          this.setState({ ejercicio: response.data });
        })
        .catch((error) => {
          console.error(error);
          alert("Ha ocurrido un error al obtener tu ejercicio");
        });
    } else {
      console.log("No se recibió el parámetro de id");
    }
  }

  //Función render para imprimir la interfaz de usuario
  render() {
    const { ejercicio } = this.state;
    return (
      <div className="mainContainerR">
        <header className="headerr">
          <div className="headerTitlee">Ejercicio</div>
          <button className="link" onClick={this.back}>
            Regresar
          </button>
        </header>
        <div className="content">
          <div>
            {ejercicio.map((punto) => {
              return <Canvas {...punto} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProbarEjercicio;
