import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "./history";

const Usuario = ({ idUsuario, nombre }) => {
  const handleClickEliminar = (event) => {
    var r = confirm("¿Estas seguro de eliminar este usuario?");
    if (r == true) {
      axios
        .post(
          `http://localhost:8080/GraficadoraDeLineas/EliminarUsuario?idUsuario=${idUsuario}`
        )
        .then((response) => {
          console.info(response);
        })
        .catch((error) => {
          console.info(error);
          alert(response);
        })
        .finally(() => {
          history.push(`/GraficadoraDeLineas/redirecting?id=1`);
        });
    }
  };
  return (
    <tr>
      <td>{nombre}</td>

      <td className="AlignCenter">
        <Button variant="success" className="M-6">
          <Link
            to={`/GraficadoraDeLineas/infousuario?id=${idUsuario}`}
            className="CustomLink"
          >
            Ver usuario
          </Link>
        </Button>
        <Button variant="warning" className="M-6">
          <Link
            to={`/GraficadoraDeLineas/editusuario?id=${idUsuario}`}
            className="CustomLink"
          >
            Modificar usuario
          </Link>
        </Button>
        <Button variant="danger" className="M-6" onClick={handleClickEliminar}>
          Eliminar usuario
        </Button>
      </td>
    </tr>
  );
};
export default Usuario;
