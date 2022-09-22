import React from "react";

const MainSection =({colors,addShapeOnCanvas,drawCanvas,handleChangeColor,canvasDivWidth,canvasDivHeight})=>{
    return <section className="section-two flex w-100">
        <div className="colors-container flex-Col justify-evenly items-center mt-10">
            <div className="cursor-pointer" onClick={()=>addShapeOnCanvas('arrowLine')}>
                <img src={"./assets/arrowLine.png"} height="24"/>
            </div>
            <div className="cursor-pointer" onClick={()=>addShapeOnCanvas('circle')}>
                <img src={"./assets/circle.png"} height="40"/>
            </div>
            <div className="cursor-pointer" onClick={drawCanvas}>
                <img src={"./assets/drawLine.png"} height="40"/>
            </div>
            <div className="cursor-pointer" onClick={()=>addShapeOnCanvas('crossShape')}>
                <img src={"/assets/crossShape.png"} height="30"/>
            </div>
        </div>
        <div className="colors-container flex-Col justify-evenly items-center mt-10">
            {
                colors.map((color,i) => <div key={i} className="color-box-container content-center cursor-pointer" onClick={()=>handleChangeColor(color)}>
                    <div className="color-box" style={{backgroundColor:color}}/>
                </div>)
            }
        </div>
        <div className="canvas-main-wrapper mt-10" style={{width:`${canvasDivWidth ? canvasDivWidth + "px" : 80 + "%"}`,height:`${canvasDivHeight ? canvasDivHeight + "px" : 97 + "%"}`}}>
            <canvas id="canvas"/>
        </div>
    </section>
}
export default MainSection;