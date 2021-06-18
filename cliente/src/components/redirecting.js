import React from 'react';
import history from './history';

//Componente que sirve de soporte para el redireccionamiento cuando se trate de volver a la misma página
class Redirecting extends React.Component{

    //Estado que obtiene el id para mantener la sesión de usuario
    state = {
        id: ""
    }

    //Función del ciclo de vida del componente para obtener el id del usuario en sesión
    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        this.setState({id: qId});
        if (qId != 1) {
            console.log("Se recibió el parámetro de id");
            history.push(`/GraficadoraDeLineas/userMainPage?id=${qId}`);
        }else{
            history.push(`/GraficadoraDeLineas/adminMainPage?id=${qId}`);
        }
    }

    //Función render solo para escribir redireccionando
    render(){
        return (
            <div>
                redirecting...
            </div>
        )
    }
}

export default Redirecting;