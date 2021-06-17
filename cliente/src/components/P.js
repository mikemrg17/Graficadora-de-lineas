import React from 'react';

class P extends React.Component {
    render () {
        return(
            <p {...this.props} className="parrafo"/>
        )
    }
}

export default P;