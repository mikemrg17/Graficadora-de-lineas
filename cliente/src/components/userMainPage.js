import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import Ejercicio from "./ejercicio";
import '../styles/userMainPage.css';
import history from './history';


class UserMainPage extends React.Component{

    state = {
        id: "",
        data: []
    }

    toAddEjercicio = e =>{
        const idUsuario = this.state.id;
        history.push(`/GraficadoraDeLineas/addEjercicio?id=${idUsuario}`);
    }


    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        this.setState({id: qId});
        if (qId) {
            console.log("Se recibió el parámetro de id");
            axios.get(`http://localhost:8080/GraficadoraDeLineas/EjerciciosUsuario?id=${qId}`)
                .then(response => {
                    console.log("Response data: " + response.data);
                    this.setState({data : response.data});
                    console.log(this.state.data);
                })
                .catch(error => {
                    console.error(error);
                    alert("Ha ocurrido un error al obtener tus ejercicios");
                })
        }else{
            console.log("No se recibió el parámetro de id");
        }
    }


    render(){
        const {data} = this.state;
        return (
            <div className="mainContainerR">
                <header className="header">
                    <div className="headerTitle">Ejercicios</div>
                    <button className="link">Ejercicios</button>
                    <button className="link">Cuenta</button>
                </header>
                <div className="content">
                    <button className="newLineButton" onClick={this.toAddEjercicio}>Nuevo Ejercicio</button>
                    <div className="contentTitle">Historial</div>
                    <Table striped bordered >
                        <thead>
                            <tr>
                                <th>X1</th>
                                <th>Y1</th>
                                <th>X2</th>
                                <th>Y2</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(ejercicio => {
                                    return <Ejercicio {...ejercicio} />
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UserMainPage;