import React from "react";
const InputSize =({value,testId,changeCanvasSize = ()=>{}})=>{
    return <input
        role={'input'}
        data-testid={testId}
        type="text"
        value={parseInt(value) || 0 }
        onChange={changeCanvasSize}
    />
}
export default InputSize;