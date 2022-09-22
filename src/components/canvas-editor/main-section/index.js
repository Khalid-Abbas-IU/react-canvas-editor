import React from "react";
import ShapeList from "./shapeList";
import ColorsPanel from "./colorsPanel";

const MainSection =({colors,addShapeOnCanvas,drawCanvas,handleChangeColor,canvasDivWidth,canvasDivHeight})=>{
    return <section className="section-two flex w-100">
        <ShapeList addShapeOnCanvas={addShapeOnCanvas} drawCanvas={drawCanvas}/>
        <ColorsPanel colors={colors} handleChangeColor={handleChangeColor}/>
        <div className="canvas-main-wrapper mt-10" style={{width:`${canvasDivWidth ? canvasDivWidth + "px" : 80 + "%"}`,height:`${canvasDivHeight ? canvasDivHeight + "px" : 97 + "%"}`}}>
            <canvas id="canvas"/>
        </div>
    </section>
}
export default MainSection;