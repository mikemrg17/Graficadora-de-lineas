import React from 'react';
import '../styles/editEjercicio.css';
import axios from 'axios';
import history from './history';

class EditEjercicio extends React.Component{

    state = {
        idEjercicio: "",
        y1: "",
        x1: "",
        y2: "",
        x2: ""
    }

    back = e => {
        
        history.goBack();
    }

    editEjercicio = e => {
        e.preventDefault();

        if (this.state.x1 == this.state.x2 && this.state.y1 == this.state.y2) {
            alert("No debes duplicar el mismo punto");
        }else {
            //alert("Se insertará el usuario ");
            console.log("Objeto a pasar");
            console.log(this.state);
            axios.post("http://localhost:8080/GraficadoraDeLineas/EditarEjercicio",this.state)
            .then(response => {
                //console.log(`Objeto recibido: ${response.data}`);
                history.goBack();
            })
            .catch(error => {
                    console.info(error);
                    console.log("Ha ocurrido un error al insertar el usuario");
            });
        } 
    }

    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("idEjercicio");
        this.setState({idEjercicio: qId});
        if (qId) {
            console.log("Se recibió el parámetro de id");
            axios.get(`http://localhost:8080/GraficadoraDeLineas/SolicitarEjercicio?idEjercicio=${qId}`)
                .then(response => {
                    console.log("Response data: " + response.data);
                    this.setState(...response.data);
                    //this.setState({ejercicio: response.data});
                })
                .catch(error => {
                    console.error(error);
                    alert("Ha ocurrido un error al obtener tu ejercicio");
                })
        }else{
            console.log("No se recibió el parámetro de id");
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
                <header className="header">
                    <div className="headerTitle">Ejercicio</div>
                    <button className="link" onClick={this.back}>Regresar</button>
                </header>
                <div className="content">
                    <div className="contentTitle">Editar ejercicio</div>
                    <form className="formEditar" onSubmit={this.editEjercicio}>
                        ID: <input type="number" value={this.state.idEjercicio} readOnly/><br/>
                        P1:( <input type="number" value={this.state.x1} onChange={e=>this.handleX1Change(e.target.value)}/> , <input type="number" value={this.state.y1} onChange={e=>this.handleY1Change(e.target.value)}/> )<br/>
                        P2:( <input type="number" value={this.state.x2} onChange={e=>this.handleX2Change(e.target.value)}/> , <input type="number" value={this.state.y2} onChange={e=>this.handleY2Change(e.target.value)}/> )<br/>
                        <input type="submit" value="Editar"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditEjercicio;