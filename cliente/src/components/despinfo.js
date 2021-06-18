import React from "react";

//Componente para poder mostrar los datos del usuario
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
