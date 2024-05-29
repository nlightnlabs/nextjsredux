
import React from 'react';

const GeneralIcon = (props) => {

  const iconName = props.iconName || ""
  const fillColor = props.fillColor || "gray"
  const fillOpacity = props.fillOpacity || "1"

 const style = {
  height: "100%",
  width: "100%"
}
      
  return (
    <svg 
      viewBox="0 0 275 275"
      style={style}
      width="275" 
      height="275" 
      xmlns="http://www.w3.org/2000/svg" 
      overflow="hidden">
        <g transform="translate(-146 -1054)"><g>
          <path d="M160.5 1109.67C160.5 1086.93 178.931 1068.5 201.668 1068.5L366.332 1068.5C389.068 1068.5 407.5 1086.93 407.5 1109.67L407.5 1274.33C407.5 1297.07 389.068 1315.5 366.332 1315.5L201.668 1315.5C178.931 1315.5 160.5 1297.07 160.5 1274.33Z" 
          stroke={fillColor} 
          stroke-width="20.625" 
          stroke-linecap="butt" 
          stroke-linejoin="miter" 
          stroke-miterlimit="8" 
          stroke-opacity={fillOpacity}  
          fill="none" 
          fill-rule="evenodd"/></g>
          </g>
          
        </svg>
  )
}

export default GeneralIcon