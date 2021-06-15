import React, { useRef, useEffect} from 'react';

const Canvas = ({idEjercicio, x1, y1, x2, y2}) => {

    const canvasRef = useRef(null)
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Nuestro primer lienzo
        context.fillStyle = '#FFFFFF'
        context.fillRect(0, 0, context.canvas.width, 500)
        context.lineTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }, [])
    
    return (
        <div>
                id ejercicio : {idEjercicio}<br/>
                x1 : {x1}<br/>
                y1 : {y1}<br/>
                x2 : {x2}<br/>
                y2 : {y2}<br/>
                <h1>Canvas:</h1>
                <canvas ref={canvasRef} className="canvas"/>
        </div>
        
    )
}


export default Canvas;