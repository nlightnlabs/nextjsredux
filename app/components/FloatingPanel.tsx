"use client"

import React, {useRef, useState, useEffect, SetStateAction, Dispatch} from "react"
import { toProperCase } from "../functions/formatValue";
import Svg from "./Svg"

export interface Object {
  [key: string]: any;
}

interface FloatingPanelPropTypes {
  children?: any;
  title?: String;
  height?: String;
  width?: String;
  headerColor?: String;
  headerTextColor?: String;
  backgroundColor?: String;
  displayPanel?: Dispatch<SetStateAction<boolean>>;
}

const FloatingPanel = (props:FloatingPanelPropTypes) => {
    const { children, title, height, width, headerColor, headerTextColor, backgroundColor, displayPanel} = props;
    
    const panelRef = useRef();
    const allowDrag = true

    const [position, setPosition] = useState({ x: 0.5*window.innerWidth, y: 0.5*window.innerHeight });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const containerStyle:Object = {
      position: "fixed",
      height: `${height}px`,
      width: `${width}px`,
      maxHeight: "80vh",
      maxWidth: "60vw",
      transform: "translate(-50%, -50%)",
      cursor: "move",
      zIndex: 99999,
      overflow: "hidden",
      backgroundColor: backgroundColor || "white"
    };
  
    const handleMouseDown = (e:any) => {
      if (!allowDrag) return;
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    };

    const handleMouseUp = (e:any) => {
        setIsDragging(false)
    };
  
    const handleMouseMove = (e:any) => {
      if (!isDragging || !allowDrag) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    };

    const handleClosePanel = (displayPanel:any)=>{
      if(displayPanel !=null && typeof displayPanel === "function"){
        displayPanel(false)
      }
    }

    const HeaderStyle:Object={
      height:"50px", 
      overflow:"hidden",
      borderBottom: "2px solid gray",
      backgroundColor: headerColor || "rgb(0,100,225)"
    }

    const TitleStyle : Object= {
      fontSize:"20px", 
      color: headerTextColor || "white", 
      fontWeight: "bold",
    }

    const BodyStyle :Object = {
        height: "95%", 
        width: "100%", 
        overflowY:"auto", 
        overflowX: "hidden",
    }
  

  
    return (
      <div
        // ref={panelRef}
        className="d-flex flex-column bg-white shadow border border-3 rounded-3"
        style={{
          ...containerStyle,
          left: position.x + "px",
          top: position.y + "px",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onDoubleClick={handleMouseUp}
      >
        <div className="d-flex justify-content-between align-items-center" style={HeaderStyle}>
          
          <div className="d-flex ms-1 align-items-center" style={TitleStyle}>
            {title && toProperCase(title.replace(/"_"/g," "))}
          </div>

          <div 
            title = "Close Panel"
            className="d-flex align-items-center me-2" 
            style={{height: "30px", width:"30px"}}
            onClick={(e)=>handleClosePanel(e)}>
            <Svg 
              iconName={"CloseIcon"}
              fillColor={"lightgray"}
              fillOpacity={"1"}
              />
          </div>

        </div>

        <div className="d-flex flex-wrap p-3" style={BodyStyle}>
          {children}
        </div>
        
      </div>
    );
  };

  export default FloatingPanel