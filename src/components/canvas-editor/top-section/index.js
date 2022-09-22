const TopSection =({canvasWidth,canvasHeight,changeCanvasSize,confirmShapePosition})=>{
    return <section className="section-one flex w-100">
        <div className="label-container content-center">
            <span>Select Shape</span>
        </div>
        <div className="label-container content-center">
            <span>Select Color</span>
        </div>
        <div className="input-canvas-size content-center">
            <div className="canvas-size-input">
                <input type="text" value={canvasWidth} onChange={changeCanvasSize}/>x
                <input type="text" value={canvasHeight} onChange={(e)=>changeCanvasSize(e,true)}/>
                Yards
            </div>
        </div>
        <div className="label-container confirm-button content-center" onClick={confirmShapePosition}>
            <span>CONFIRM</span>
        </div>
    </section>
}
export default TopSection;