import React from 'react';

//Componente para separar las etiquetas <p> para escribir los errores de validación
class P extends React.Component {
    render () {
        return(
            <p {...this.props} className="parrafo"/>
        )
    }
}

export default P;