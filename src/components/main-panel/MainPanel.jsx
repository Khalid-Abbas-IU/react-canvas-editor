import React from 'react';
import './index.css'
import ReactCanvasEditor from "./ReactCanvasEditor";
const MainPanel =()=> {
    return (
        <div className={`main-app-panel`}>
            <ReactCanvasEditor/>
        </div>
    );
}
export default MainPanel;