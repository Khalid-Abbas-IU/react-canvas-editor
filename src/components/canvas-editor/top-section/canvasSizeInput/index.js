import React from "react";
import InputSize from "./InputSize";
const CanvasSizeInput =({canvasWidth,canvasHeight,changeCanvasSize = ()=>{}})=>{
    return (
        <div data-testid="canvas-size-input" className="input-canvas-size content-center">
            <div className="canvas-size-input">
                <InputSize testId={'canvas-width'} value={canvasWidth} changeCanvasSize={changeCanvasSize}/>x
                <InputSize testId={'canvas-height'} value={canvasHeight} changeCanvasSize={()=>changeCanvasSize(true)}/>
                Yards
            </div>
        </div>
    )
}
export default CanvasSizeInput;