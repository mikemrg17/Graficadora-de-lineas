import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ejercicio.css";
import history from "./history";

//Componente que obtiene los valores de cada ejercicio para poder agregarlo a la tabla
const Ejercicio = ({ idEjercicio, x1, y1, x2, y2 }) => {
  let idUsuario;

  //Función para elimianr el ejercicio con una petición HTTP POST
  const handleClickEliminar = (event) => {
    var r = confirm("¿Estas seguro de eliminar este ejercicio?");
    if (r == true) {
      axios
        .post(
          `http://localhost:8080/GraficadoraDeLineas/EliminarEjercicio?idEjercicio=${idEjercicio}`
        )
        .then((response) => {
          console.log(response.data);
          let objectReceived = {
            id: "",
          };
          objectReceived = { id: response.data };
          idUsuario = response.data;
          history.push(`/GraficadoraDeLineas/redirecting?id=${idUsuario}`);
        })
        .catch((error) => {
          console.info(error);
        });
    }
  };

  //Función para poder imprimir la interfaz de usuario
  return (
    <tr>
      <td>{x1}</td>
      <td>{y1}</td>
      <td>{x2}</td>
      <td>{y2}</td>

      <td className="AlignCenter">
        <Button variant="success" className="M-6">
          <Link
            to={`/GraficadoraDeLineas/probarEjercicio?idEjercicio=${idEjercicio}`}
            className="CustomLink"
          >
            Probar Ejercicio
          </Link>
        </Button>
        <Button variant="warning" className="M-6">
          <Link
            to={`/GraficadoraDeLineas/editEjercicio?idEjercicio=${idEjercicio}`}
            className="CustomLink"
          >
            Editar Ejercicio
          </Link>
        </Button>
        <Button variant="danger" className="M-6" onClick={handleClickEliminar}>
          Eliminar Ejercicio
        </Button>
      </td>
    </tr>
  );
};
export default Ejercicio;
