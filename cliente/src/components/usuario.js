import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Usuario = ({ nombre }) => {
  return (
    <tr>
      <td>{nombre}</td>

      <td className="AlignCenter">
        <Button>Ver usuario</Button>
        <Button>Modificar usuario</Button>
        <Button>Eliminar usuario</Button>
      </td>
    </tr>
  );
};
export default Usuario;
