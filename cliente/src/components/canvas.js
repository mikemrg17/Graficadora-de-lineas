import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
    const canvasRef = useRef(null)
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Nuestro primer lienzo
        context.fillStyle = '#FFFFFF'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        context.lineTo(140, 60)
        context.lineTo(149, 10)
        context.stroke()
    }, [])
    
    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas