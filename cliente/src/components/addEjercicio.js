import React from 'react';
import '../styles/addEjercicio.css';
import axios from 'axios';

import history from './history';

class AddEjercicio extends React.Component{

    state = {
        id: "",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "1"
    }

    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        this.setState({id: qId});
    }

    addEjercicio = e => {
        e.preventDefault();

        if (this.state.x1 == this.state.x2 && this.state.y1 == this.state.y2) {
            alert("No debes duplicar el mismo punto");
        }else {
            //alert("Se insertará el usuario ");
            console.log("Objeto a pasar");
            console.log(this.state);
            /*axios.post("http://localhost:8080/GraficadoraDeLineas/InsertarUsuario",this.state)
            .then(response => {
            //console.log(`Objeto recibido: ${response.data}`);
            let respuestaServer = response.data;
            let cadenaSeparada = respuestaServer.split(",");
            let idUsuario = cadenaSeparada[0];
            console.log(`TIPO DE IDUSUARIO ES : ${typeof idUsuario}`); 
            console.log(`IDUSUARIO ES : ${idUsuario}`);
            history.push('/GraficadoraDeLineas/userMainPage');
            })
            .catch(error => {
                    console.info(error);
                    console.log("Ha ocurrido un error al insertar el usuario");
            });*/
        } 
    }

    handleX1Change = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            x1: value
        },console.log(this.state.x1));
    }

    handleY1Change = (value) =>{
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            y1: value
        },console.log(this.state.y1));
    }

    handleX2Change = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            x2: value
        },console.log(this.state.x2));
    }

    handleY2Change = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        this.setState({
            y2: value
        },console.log(this.state.y2));
    }

    render(){
        return (
            <div className="mainContainerR">
                <h1 className="title">Nuevo Ejercicio</h1>
                <form className="formAddEjercicio" onSubmit={this.addEjercicio}>
                    (<input type="number" name="x1" id="x1" placeholder="x1" className="formInput" onChange={e=>this.handleX1Change(e.target.value)}/>
                    <input type="number" name="y1" id="y1" placeholder="y1" className="formInput" onChange={e=>this.handleY1Change(e.target.value)}/>),
                    (<input type="number" name="x2" id="x2" placeholder="x2" className="formInput" onChange={e=>this.handleX2Change(e.target.value)}/>
                    <input type="number" name="y2" id="y2" placeholder="y2" className="formInput" onChange={e=>this.handleY2Change(e.target.value)}/>)
                    <div className="buttonDiv">
                            <input type="Submit" className="button" value="Agregar Ejercicio"/>                                 
                    </div>
                </form>
            </div>
        )
    }
}

export default AddEjercicio;