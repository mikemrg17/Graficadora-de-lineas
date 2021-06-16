import React, { useRef, useEffect} from 'react';
import '../styles/canvas.css';

const Canvas = ({idEjercicio, x1, y1, x2, y2}) => {

    const canvasRef = useRef(null)
    
    const draw = ctx =>{
        ctx.fillStyle = '#FFFFFF'

        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height/2)
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height/2)
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(ctx.canvas.width/2, 0)
        ctx.lineTo(ctx.canvas.width/2, ctx.canvas.height)
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();


        ctx.beginPath();
        ctx.moveTo(x1 + ctx.canvas.width/2, ctx.canvas.height/2 - y1)
        ctx.lineTo(x2 + ctx.canvas.width/2, ctx.canvas.height/2 - y2)
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Nuestro primer lienzo
        /*context.fillStyle = '#FFFFFF'

        context.beginPath();
        context.moveTo(context.canvas.width/2, context.canvas.height/2)
        context.lineTo(context.canvas.width/2, context.canvas.height/2)
        context.lineWidth = 2;
        context.stroke();
        context.closePath();


        context.beginPath();
        context.moveTo(x1 + context.canvas.width/2, context.canvas.height/2 - y1)
        context.lineTo(x2 + context.canvas.width/2, context.canvas.height/2 - y2)
        context.lineWidth = 3;
        context.stroke();
        context.closePath();*/
        draw(context);
    }, [draw])
    
    return (
        <div>
                <h1>Gráfica:</h1>
                <canvas ref={canvasRef} className="canvas" width={400} height={400}/>
                <br/>
                P1: ( <input type="number" value={x1} readOnly className="location"/> , <input type="number" value={y1} readOnly className="location"/> )
                <br/>
                P2: ( <input type="number" value={x2} readOnly className="location"/> , <input type="number" value={y2} readOnly className="location"/> )
        </div>
        
    )
}


export default Canvas;