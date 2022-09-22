import ShapeImage from "./shapeImage";
import React from "react";

const ShapeList =({addShapeOnCanvas,drawCanvas})=>{
    return (
        <div className="colors-container flex-Col justify-evenly items-center mt-10">
            <ShapeImage name={"arrowLine"} addShapeOnCanvas={addShapeOnCanvas} height={"25"}/>
            <ShapeImage name={"circle"} addShapeOnCanvas={addShapeOnCanvas} height={"40"}/>
            <ShapeImage name={"drawLine"} addShapeOnCanvas={drawCanvas} height={"40"}/>
            <ShapeImage name={"crossShape"} addShapeOnCanvas={addShapeOnCanvas} height={"30"}/>
        </div>
    )
}
export default ShapeList;
