import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import axios from "axios";

const Ejercicio = ({ id, x1, y1, x2, y2 }) => {

    const handleClickEliminar = (event) => {
        //Eliminar
        alert("Eliminado papu");
    }

    return (
        <tr>
            <td>{x1}</td>
            <td>{y1}</td>
            <td>{x2}</td>
            <td>{y2}</td>

                <td className="AlignCenter">
                <Button
                    variant="success"
                    className="M-6">
                    <Link to={`/`} className="CustomLink" >
                        Ver Ejericio
                    </Link>
                </Button>
                <Button
                    variant="warning"
                    className="M-6">
                    <Link to={``} className="CustomLink" >
                        Editar Ejercicio
                    </Link>
                </Button>
                <Button
                    variant="danger"
                    className="M-6"
                    onClick={handleClickEliminar}>
                    Eliminar Ejercicio
                </Button>
            </td>
        </tr>
    )
}
export default Ejercicio;
