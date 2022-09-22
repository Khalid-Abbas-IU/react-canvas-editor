import React from "react";

function ColorsPanel ({colors,handleChangeColor}){
    return <div className="colors-container flex-Col justify-evenly items-center mt-10">
        {colors.map((color,i) => <div key={i} className="color-box-container content-center cursor-pointer" onClick={()=>handleChangeColor(color)}>
                <div className="color-box" style={{backgroundColor:color}}/>
            </div>)}
    </div>
}
export default ColorsPanel;
