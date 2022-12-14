import React from "react";

function ShapeImage ({name,addShapeOnCanvas}){
    return <div data-testid={'shapeImage'} className="cursor-pointer" onClick={()=>addShapeOnCanvas(name)}>
        <img src={`./assets/${name}.png`} height="40"/>
    </div>
}
export default ShapeImage;
