import React from "react";

const ShapesListPanel =({addedShapes,visibleCanvasObject,deleteShapeFromList})=>{
    return <section className="section-three flex w-100">
        <div className="flex justify-space-btw width-inherit mt-10">
            <div className="label-container content-center w-20per">
                <span>Shapes</span>
            </div>
            <div className="label-container content-center w-70per">
                <span>co ordinates in yards</span>
            </div>
            <div className="label-container content-center w-10per">
                <span>remove</span>
            </div>
        </div>
        <div className="dimension-table mt-10 w-100">
            {
                addedShapes.map(shape=>{
                    const {name, refId, src, coordinates} = shape;
                    return <div className="table-row" key={refId}>
                        <div className="shapes-list-container w-20per content-center" onClick={()=>visibleCanvasObject(name,refId)}>
                            <img src={`./assets/${src}.png`} height="15" width="35" alt="shapeImage"/>
                        </div>
                        <div className="shapes-list-container w-70per content-center" onClick={()=>visibleCanvasObject(name,refId)}>
                            {coordinates}
                        </div>
                        <div className="shapes-list-container-cross w-10per content-center" onClick={()=>deleteShapeFromList(name,refId)}>
                            X
                        </div>
                    </div>
                })
            }
        </div>
    </section>
}
export default ShapesListPanel;