import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Despinfo = ({ idUsuario, email, nombre, apellido, password }) => {
  return (
    <tr>
      <td>{idUsuario}</td>
      <td>{email}</td>
      <td>{nombre}</td>
      <td>{apellido}</td>
      <td>{password}</td>
    </tr>
  );
};
export default Despinfo;
