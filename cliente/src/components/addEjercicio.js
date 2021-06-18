import React from 'react';
import '../styles/addEjercicio.css';
import axios from 'axios';
import history from './history';

//Componente que sirve para agregar un ejericio

class AddEjercicio extends React.Component{

    /*Tendremos un estado, el cuál tendrá llaves, para las localizaciones
    tendremos valores numéricos para la consistencia de datos con el servidor*/
    state = {
        id: "",
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 1
    }

    //Función flecha que recibe un evento (pulsar) y que redirecciona ala página anterior
    back = e => {
        history.goBack();
    }

    //Cumpliendo con el ciclo de vida del componente de react, obtendremos el id correspondiente al usuario
    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        this.setState({id: qId});
    }

    //Función encargada de conectar con el servidor y mandar la información para ser insertada
    addEjercicio = e => {
        e.preventDefault();

        if (this.state.x1 == this.state.x2 && this.state.y1 == this.state.y2) {
            alert("No debes duplicar el mismo punto");
        }else {
            console.log("Objeto a pasar");
            console.log(this.state);
            axios.post("http://localhost:8080/GraficadoraDeLineas/InsertarEjercicio",this.state)
            .then(response => {
                history.push(`/GraficadoraDeLineas/userMainPage?id=${this.state.id}`);
            })
            .catch(error => {
                    console.info(error);
                    console.log("Ha ocurrido un error al insertar el usuario");
            });
        } 
    }

    //Handles: son para cambiar los valores de los inputs y obtener ese valor
    handleX1Change = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        value = parseFloat(value);
        this.setState({
            x1: value
        },console.log(this.state.x1));
    }

    handleY1Change = (value) =>{
        value ? console.log("Aceptado") : console.log("No aceptado");
        value = parseFloat(value);
        this.setState({
            y1: value
        },console.log(this.state.y1));
    }

    handleX2Change = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        value = parseFloat(value);
        this.setState({
            x2: value
        },console.log(this.state.x2));
    }

    handleY2Change = (value) => {
        value ? console.log("Aceptado") : console.log("No aceptado");
        value = parseFloat(value);
        this.setState({
            y2: value
        },console.log(this.state.y2));
    }
      
    //Función render que nos renderizará la interfaz en el navegador
    render(){
        return (
            <div className="mainContainerR">
                 <center>
                    <header className="headerr">
                        <div className="headerTitlee">Ejercicio</div>
                            <button className="link" onClick={this.back}>
                            Regresar
                            </button>
                    </header>
                    <h1 className="title">Nuevo Ejercicio</h1>
                    <button className="link" onClick={this.back}>Regresar</button>
                    <form className="formAddEjercicio" onSubmit={this.addEjercicio}>
                        (<input type="number" name="x1" id="x1" placeholder="x1" className="formInput" onChange={e=>this.handleX1Change(e.target.value)}/>
                        <input type="number" name="y1" id="y1" placeholder="y1" className="formInput" onChange={e=>this.handleY1Change(e.target.value)}/>),
                        (<input type="number" name="x2" id="x2" placeholder="x2" className="formInput" onChange={e=>this.handleX2Change(e.target.value)}/>
                        <input type="number" name="y2" id="y2" placeholder="y2" className="formInput" onChange={e=>this.handleY2Change(e.target.value)}/>)
                        <div className="buttonDiv">
                                <input type="Submit" className="button" value="Agregar Ejercicio"/>                                 
                        </div>                    
                    </form>
                </center>        
            </div>
        )
    }
}

export default AddEjercicio;