import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import Ejercicio from "./ejercicio";
import '../styles/userMainPage.css';

class UserMainPage extends React.Component{

    state = {
        id: "",
        data: []
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
                <div className="headerUserMainPage">This is a header</div>
                <div className="contentUserMainPage">This is the content</div>
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
        )
    }
}

export default UserMainPage;