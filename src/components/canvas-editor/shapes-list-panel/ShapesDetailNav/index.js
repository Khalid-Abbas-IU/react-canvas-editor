import React from "react";
const ShapeDetailNav =()=>{
    return <div data-testid={'shape-detail'} className="flex justify-space-btw width-inherit mt-10">
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
}
export default ShapeDetailNav;