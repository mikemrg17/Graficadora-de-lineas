import React from 'react';
import history from './history';


class Redirecting extends React.Component{

    state = {
        id: ""
    }

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

    render(){
        return (
            <div>
                redirecting...
            </div>
        )
    }
}

export default Redirecting;