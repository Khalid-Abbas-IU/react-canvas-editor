import {useEffect, useState} from "react";
import {fabric} from 'fabric';
import '../../fabric-overrids'
import './index.css'
let canvas, colors=['red','green', 'blue', 'purple'],
    initialWidthYards = 0,canvasWidthVal=0,canvasHeightVal=0,addedObjs=[],selectedShapeType = '',isAddingShape = false, initialPointers = {};

const ReactCanvasEditor = () =>{

    // Declare and initialize component states.
    const [canvasWidth, setCanvasWidth] = useState(0)  // State hold canvas updated size
    const [canvasHeight, setCanvasHeight] = useState(0)  // State hold canvas updated size
    const [addedShapes, setAddedShapes] = useState([]) // State hold Added arrow list.
    const [perYard, setPerYard] = useState(0) // has one yard value
    const [canvasDivWidth, setCanvasDivWidth] = useState(0)
    const [canvasDivHeight, setCanvasDivHeight] = useState(0)


    useEffect(() => {
        // Initialize canvas and set dimension.
        inItCanvas();

        // Initialize keyup event for listening event for enter.
        window.addEventListener('keyup',onKeyUp)
    },[]);


    const onKeyUp =(e)=>{
        if (e?.key === 'Enter') { //  after typed new value of canvas , it listen enter event.
            setPerYard(canvas.getWidth() / canvasWidthVal); //setPerYard value by dividing canvas width with "canvasSizeVal" new size of canvas.

            alert("Canvas Size has been updated successfully") // alert for test
        }
    }
    
    const inItCanvas =()=>{
        // Initialize fabric canvas
        canvas = new fabric.Canvas('canvas',{
            allowTouchScrolling: true,
            backgroundColor:'white',
            selection: false,
        })

        window.canvas = canvas;

        // On canvas events
        onCanvasEvents(canvas)
        // set canvas height and width
        adjustCanvasDimensions()
        canvas.renderAll();
    }

    const adjustCanvasDimensions=()=>{
        let elHeight = 0, elWidth = 0;
        // get height and width of canvas-main-wrapper div.
        document.querySelectorAll('div').forEach((el)=>{
            if (el.classList.contains('canvas-main-wrapper')){
                elWidth = el.clientWidth;
                elHeight = el.clientHeight;
            }
        })
        let width = elWidth,
            height = elHeight,
            oneYard = width * 0.05; // 1yard = canvas width * 0.05
        setPerYard(oneYard) // set peryard value
        initialWidthYards = width/oneYard; // divide one yard to width in pixels.
        setCanvasWidth(Math.trunc(width/oneYard))
        setCanvasHeight(Math.trunc(height/oneYard))
        canvas.setWidth(width) // set canvas width
        canvas.setHeight(height) // set canvas height
        canvas.renderAll();
    }

    function onCanvasEvents(canvas){
        // canvas events
        canvas.on({
            'mouse:up':mouseUp,
            'mouse:down':mouseDown,
            'mouse:move':mouseMove,
        })
    }
    const addCircle =(left,top)=>{
        if (canvas.getObjects().findIndex(o=>o.name === "circle" && o.opacity) > -1) return;

        const uuid = require("uuid");
        let id = uuid.v4();
        // Initiate a Circle instance
        var circle = new fabric.Circle({
            name:'circle',
            radius: 50,
            fill: '',
            stroke: 'green',
            strokeWidth: 3,
            originX:'center',
            originY:'center',
            left, top,
            evented:false,
            isAddingMode:true,
            ref_id:id,
        });
        circle.scaleToWidth(10)
        // Render the circle in canvas
        canvas.add(circle);

        // canvas.setActiveObject(circle);
        canvas.renderAll();
    }
    const addCrossShape =(left,top)=>{
        if (canvas.getObjects().findIndex(o=>o.name === "crossShape" && o.opacity) > -1) return;
        const uuid = require("uuid");
        let id = uuid.v4();
        const newPoints = [
            { x: left, y: top },
            { x: left + 12, y: top + 15 },
            { x: left , y: top + 30 },
            { x: left + 5, y: top + 30 },

            { x: left + 15, y: top + 18 },
            { x: left + 25, y: top + 30 },
            { x: left + 30, y: top + 30 },
            { x: left + 18, y: top + 15 },

            { x: left + 30, y: top },
            { x: left + 25, y: top },
            { x: left + 15, y: top + 12 },
            { x: left + 5, y: top },
            { x: left, y: top },

        ]

        const crossShape = new fabric.Polygon(newPoints,
            {
                left: left,
                top: top,
                fill: 'blue',
                strokeWidth: 0,
                stroke: '',
                scaleX: 0.1,
                scaleY: 0.1,
                cornerColor: 'blue',
                evented:false,
                ref_id: id,
                originX: 'center',
                originY: 'center',
                name: 'crossShape',
                isAddingMode:true,
            });

        canvas.add(crossShape);
        // canvas.setActiveObject(crossShape)
        canvas.renderAll();
    }


    const handleChangeColor=(color)=>{
        const activeObject = canvas.getActiveObject(); //
        if (activeObject){
            switch (activeObject.name){
                case 'crossShape':
                    activeObject.dirty = true;
                    activeObject.set('fill',color);
                    canvas.renderAll();
                    break;
                case 'circle':
                    activeObject.dirty = true;
                    activeObject.set('stroke',color);
                    canvas.renderAll();
                    break;
                case 'arrowLine':
                    activeObject.dirty = true;
                    activeObject._objects.forEach(o=>{
                        if (o.name === "arrow") o.set('fill',color);
                        else o.set('stroke',color);
                    })
                    canvas.renderAll();
                    break;
                case "drawLine":
                    activeObject._objects.forEach(obj => {
                        if (obj.name === "drawElementArrow") {
                            obj.set({ fill: color })
                        } else if (obj.name === "drawElementBlock") {
                            obj.set({ fill: color })
                            obj.set({ stroke: color })
                        } else {
                            obj.set({ stroke: color })
                        }
                    })
                    canvas.renderAll();
                    break;
                default:
                    break;
            }

        }
    }

    const setArrowAlignment = (x2, y2, tempVal) => {
        if (tempVal === -1.57) {
            // 90 degrees
            x2 = x2 - 2
        }
        else if (-1.57 < tempVal && tempVal < 0) {
            // between 0 and 90 degrees
            x2 = x2 - 1.75;
            y2 = y2 - 2;
        }
        else if (tempVal < -1.57) {
            // between 90 and 180 degrees
            y2 = y2 + 2;
            x2 = x2 - 1.75;
        }
        else if (tempVal <= 3.14 && tempVal > 1.57) {
            // between 180 and 270 degrees
            x2 = x2 + 1.75;
            y2 = y2 + 2;
        }
        else if (tempVal === 1.57) {
            // 360 degrees
            x2 = x2 + 2;
        }
        else {
            x2 = x2 + 2;
            y2 = y2 - 2;
        }

        return {
            x2, y2
        }
    }

    const drawArrow = (x1, y1, x2, y2, type, color, id) => {
        let obj;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const tempVal = Number.parseFloat(angle).toFixed(2);
        if (type === "arrow") {
            x2 = setArrowAlignment(x2, y2, tempVal).x2;
            y2 = setArrowAlignment(x2, y2, tempVal).y2;
            obj = new fabric.Triangle({
                left: x2,
                top: y2,
                hasBorders: false,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
                lockMovementX: true,
                lockMovementY: true,
                selectable: true,
                evented: false,
                originX: 'center',
                ref_id: id,
                originY: 'center',
                angle: (angle * (180 / (3.142))) - 30,
                width: 12,
                height: 12,
                fill: color,
                name: "drawElementArrow",
                is_animation: false,
                dirty: true,
                selectionBackgroundColor: 'transparent',
            });

        }


        return obj;
    }

    const updateAfterDraw = () => {
        if (!canvas.isDrawingMode) return;
        const uuid = require("uuid");
        let id = uuid.v4();
        var path = canvas._objects[canvas._objects.length - 1]
        if (path) {
            // path.perPixelTargetFind = true
            if (path.path) {
                var x1 = path.path[path.path.length - 2][1]
                var y1 = path.path[path.path.length - 2][2]

                var x2 = path.path[path.path.length - 1][1]
                var y2 = path.path[path.path.length - 1][2]

                var brushType = "arrow";
                let drawElement = null;
                let objs = [canvas._objects[canvas._objects.length - 1]];

                drawElement = drawArrow(x1, y1, x2, y2, brushType, canvas.freeDrawingBrush.color, id)
                objs.unshift(drawElement);
                canvas.remove(path)
                if (!objs.length) return;
                const group = new fabric.Group(objs, {
                    originX: 'center',
                    originY: 'center',
                    name: "drawLine",
                    ref_id: id,
                });

                canvas.add(group);
                canvas.setActiveObject(group)
                canvas.isDrawingMode = false
                canvas.renderAll();
            }
        }
    }
    const mouseUp =()=>{
        if (isAddingShape){
            const canvasObjs = canvas.getObjects();
            const actObjInd = canvasObjs.findIndex(o=>o.isAddingMode);
            if (actObjInd > -1){
                canvasObjs[actObjInd].isAddingMode = false;
                canvasObjs[actObjInd].evented = true;
                canvas.setActiveObject(canvasObjs[actObjInd])
                canvas.renderAll();
            }
        }
        isAddingShape = false
        initialPointers = {}
        selectedShapeType = ''

        updateAfterDraw()
    }
    const mouseDown =(e)=>{
        if (!selectedShapeType) return;
        const {x,y} = e.pointer;
        initialPointers = e.pointer
        switch (selectedShapeType) {
            case "circle":
                addCircle(x,y)
                isAddingShape = true
                break;
            case "arrowLine":
                reDrawArrowLine({x,y},x,y)
                isAddingShape = true
                break;
            case "drawLine":
                break;
            case "crossShape":
                isAddingShape = true
                addCrossShape(x,y)
                break;
            default:break;
        }
    }
    const mouseMove =(e)=>{
        if (isAddingShape){
            const actObj = canvas.getObjects().find(o=>o.name === selectedShapeType && o.isAddingMode);
            if (actObj){
                const {x,y} = e.pointer;
                const calcOffsetX = x - initialPointers.x;
                const calcOffsetY = y - initialPointers.y;
                if (actObj.name === "circle" || actObj.name === "crossShape") actObj.scaleToHeight(calcOffsetY * 2)
                if (actObj.name === "arrowLine") {
                    reDrawArrowLine(initialPointers,x,y)
                }
                canvas.renderAll();
            }
        }
    }


    const reDrawArrowLine = ({x,y},newX2,newY2) => {
        const arrowLineInd = canvas.getObjects().findIndex(o=>o.name === "arrowLine" && o.opacity);
        if (arrowLineInd > -1) {
            canvas.remove(canvas.getObjects()[arrowLineInd])
            canvas.renderAll();
        }
        const uuid = require("uuid");
        let id = uuid.v4();
        let x1 = x;
        let y1 = y;
        let x2 = newX2;
        let y2 = newY2;
        var line = new fabric.Line([x1, y1, x2, y2], {
            stroke: 'black',
            strokeWidth: 3,
            originX:'center',
            originY:'center',
            name: "arrow_line",
        });
        //
        var arrow = new fabric.Triangle({
            left: x2,
            top: y2,
            angle: Math.atan2(y1,x2),
            width: 15,
            height: 15,
            originX:'center',
            originY:'center',
            fill: 'black',
            name: "arrow",
        });
        const group = new fabric.Group([line,arrow], {
            name: "arrowLine",
            originX:'center',
            originY:'center',
            evented:false,
            isAddingMode:true,
            ref_id: id,
        });
        canvas.add(group)
        canvas.renderAll();
    }

    const addArrowLine = (x1,y1) => {
        if (canvas.getObjects().findIndex(o=>o.name === "arrowLine" && o.opacity) > -1) return;
        const uuid = require("uuid");
        let id = uuid.v4();
        // let x1 = 200;
        // let y1 = 200;
        let x2 = x1;
        let y2 = y1;
        var line = new fabric.Line([x1, y1, x2, y2], {
            stroke: 'black',
            strokeWidth: 3,
            hasBorders: false,
            hasControls: false,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            selectable: false,
            left: x1,
            top: y1,
            name: "arrow_line",
        });

        var arrow = new fabric.Triangle({
            left: x2,
            top: y2,
            hasBorders: false,
            hasControls: false,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            selectable: false,
            pointType: 'arrow_start',
            angle:90,
            originX: 'center',
            originY: 'center',
            width: 10,
            height: 10,
            fill: 'black',
            name: "arrow",
        });
        const group = new fabric.Group([line,arrow], {
            name: "arrowLine",
            evented:false,
            ref_id: id,
        });
        canvas.add(group)
        // canvas.setActiveObject(group)
        canvas.renderAll();
    }

    const drawCanvas = () => {
        const type = "arrow"
        canvas.isDrawingMode = !canvas.isDrawingMode
        if (!canvas.isDrawingMode) return;
        if (canvas.getObjects().findIndex(o=>o.name === "drawLine"  && o.opacity) > -1) {
            canvas.isDrawingMode = false;
            return;
        }

        if (type === "simple" || type === "arrow" || type === "block") {
            canvas.freeDrawingBrush.strokeDashArray = 0
        } else {
            canvas.freeDrawingBrush.strokeDashArray = [10, 5]
        }
        canvas.freeDrawingBrush.width = 3;
        // canvas.freeDrawingBrush.color = color;
        canvas.renderAll()
        canvas.discardActiveObject();
    }

    const changeCanvasSize =(e,isHeight=false)=>{
        const VAL = e.target.value;
        if (isHeight) {
            canvasHeightVal = VAL
            setCanvasHeight(VAL)
        }
        else {
            canvasWidthVal = VAL;
            setCanvasWidth(VAL)
        }
    }
    const visibleCanvasObject =(name,refId)=>{
        const canvasObjects = canvas.getObjects();
        const particularObjectInd = canvasObjects.findIndex(o=>o.name === name && o.ref_id === refId);
        if (particularObjectInd > -1){
            const {opacity, evented, selectable} = canvasObjects[particularObjectInd];
            canvasObjects[particularObjectInd].set({
                opacity:!opacity,
                evented:!evented,
                selectable:!selectable
            })
            if (canvas.getActiveObject()) canvas.discardActiveObject();
            canvas.renderAll();
        }
    }

    const deleteShapeFromList =(name, refId)=>{
        const canvasObjects = canvas.getObjects();
        let shapeList = [...addedShapes];
        const particularObjectInd = canvasObjects.findIndex(o=>o.name === name && o.ref_id === refId);
        if (particularObjectInd > -1){
            const shapeInd = shapeList.findIndex(o=>o.name === name && o.refId === refId);
            const shape1Ind = addedObjs.findIndex(o=>o.name === name && o.refId === refId);
            canvas.remove(canvasObjects[particularObjectInd]);
            canvas.renderAll();
            if (shapeInd > -1){
                shapeList.splice(shapeInd,1)
            }
            if (shape1Ind > -1){
                addedObjs.splice(shapeInd,1)
            }
            setAddedShapes([...shapeList])

        }
    }

    const confirmShapePosition =()=>{
        const canvasActiveObj = canvas.getActiveObject();
        if (canvasActiveObj){
            let coordinates = "",objAlreadyInd = -1;
            const left = canvasActiveObj.left ,
                top = canvasActiveObj.top ,
                scaledWidth = canvasActiveObj.getScaledWidth(),
                scaledHeight = canvasActiveObj.getScaledHeight();
            switch (canvasActiveObj.name){
                case "circle":
                    coordinates = `Circle (${Math.trunc((left + scaledWidth/2)/perYard)}, ${Math.trunc((top + scaledHeight/2)/ perYard)}) Position, ${Math.trunc(scaledWidth/ perYard)} Yards.`
                    objAlreadyInd= addedObjs.findIndex(o=>o.refId === canvasActiveObj.ref_id && o.name === "circle");
                    if (objAlreadyInd > -1){
                        addedObjs[objAlreadyInd].coordinates = coordinates;
                    }else {
                        addedObjs.push({
                            name: canvasActiveObj.name,
                            refId:canvasActiveObj.ref_id,
                            src:'circle',
                            coordinates
                        })
                    }

                    break;
                case "arrowLine":
                    coordinates = `Arrow, From (${Math.trunc((left - scaledWidth/2)/perYard)}, ${Math.trunc((top - scaledHeight/2)/ perYard)}) to (${Math.trunc((left + scaledWidth/2)/ perYard)}, ${Math.trunc((top + scaledHeight / 2) / perYard)}) Position, ${Math.trunc(scaledWidth/ perYard)} Yards.`
                    objAlreadyInd= addedObjs.findIndex(o=>o.refId === canvasActiveObj.ref_id && o.name === "arrowLine");
                    if (objAlreadyInd > -1) addedObjs[objAlreadyInd].coordinates = coordinates;
                    else addedObjs.push({
                        name: canvasActiveObj.name,
                        refId:canvasActiveObj.ref_id,
                        src:'arrowLine',
                        coordinates
                    })
                    break;
                case "drawLine":
                    coordinates = `Free Line, From (${Math.trunc((left - scaledWidth/2)/ perYard)}, ${Math.trunc((top - scaledHeight/2)/ perYard)}) to (${Math.trunc((left + scaledWidth/2)/ perYard)}, ${Math.trunc((top + scaledHeight / 2)/ perYard)}) Position,  ${Math.trunc(scaledWidth/ perYard)} Yards.`
                    objAlreadyInd= addedObjs.findIndex(o=>o.refId === canvasActiveObj.ref_id && o.name === "drawLine");
                    if (objAlreadyInd > -1) addedObjs[objAlreadyInd].coordinates = coordinates;
                    else addedObjs.push({
                        name: canvasActiveObj.name,
                        refId:canvasActiveObj.ref_id,
                        src:'drawLine',
                        coordinates
                    })
                    break;
                case "crossShape":
                    coordinates = `Shape (${Math.trunc((left + scaledWidth/2)/ perYard)}, ${Math.trunc((top + scaledHeight/2)/ perYard)}) Position, ${Math.trunc(scaledWidth/ perYard)} Yards.`
                    objAlreadyInd= addedObjs.findIndex(o=>o.refId === canvasActiveObj.ref_id && o.name === "crossShape");
                    if (objAlreadyInd > -1) addedObjs[objAlreadyInd].coordinates = coordinates;
                    else addedObjs.push({
                        name: canvasActiveObj.name,
                        refId:canvasActiveObj.ref_id,
                        src:canvasActiveObj.name,
                        coordinates
                    })
                    break;
                default:break;
            }
            setAddedShapes([...addedObjs])
            canvas.discardActiveObject();
            canvasActiveObj.set({
                opacity:0,
                evented:false,
                selectable:false
            })
            canvas.renderAll();
        }
    }

    const addShapeOnCanvas =(type)=>{
        selectedShapeType = type
    }


    return (
        <div className="fabric-editor-container">
            <div className="editor-main-wrapper">

                <section className="section-one flex w-100">
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


                <section className="section-two flex w-100">
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


                <section className="section-three flex w-100">
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
            </div>
        </div>
    );
}
export default ReactCanvasEditor;
