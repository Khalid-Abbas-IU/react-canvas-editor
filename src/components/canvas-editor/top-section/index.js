import React from "react";
import CanvasSizeInput from "./canvasSizeInput";
const TopSection =({canvasWidth,canvasHeight,changeCanvasSize,confirmShapePosition})=>{
    return <section data-testid={"top-section"} className="section-one flex w-100">
        <div className="label-container content-center">
            <span>Select Shape</span>
        </div>
        <div className="label-container content-center">
            <span>Select Color</span>
        </div>
        <CanvasSizeInput canvasHeight={canvasHeight} canvasWidth={canvasWidth} changeCanvasSize={changeCanvasSize}/>
        <div className="label-container confirm-button content-center" onClick={confirmShapePosition}>
            <span>CONFIRM</span>
        </div>
    </section>
}
export default TopSection;