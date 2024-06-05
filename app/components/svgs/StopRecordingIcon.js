import React from 'react';

const StopRecordingIcon = (props) => {

  const iconName = props.iconName || ""
  const fillColor = props.fillColor || "gray"
  const fillOpacity = props.fillOpacity || "1"
  
  const style = {
    height: "100%",
    width: "100%"
  }
      
  return (
    <svg 
      viewBox="0 0 279 280"
      width="279" 
      height="280" 
      xmlns="http://www.w3.org/2000/svg" 
      overflow="hidden"
      style={style}
      >
      <g 
        transform="translate(-142 -1049)"><g>
        
        <path d="M160 1109.17C160 1086.43 178.431 1068 201.167 1068L365.832 1068C388.569 1068 407 1086.43 407 1109.17L407 1273.83C407 1296.57 388.569 1315 365.832 1315L201.167 1315C178.431 1315 160 1296.57 160 1273.83Z" 
        stroke={fillColor}  
        stroke-width="27.5" 
        stroke-linecap="butt" 
        stroke-linejoin="miter" 
        stroke-miterlimit="8" 
        stroke-opacity="1" 
        fill="#FFFFFF" 
        fill-rule="evenodd" 
        fill-opacity={fillOpacity}
      />

      <path 
        d="M209 1142.67C209 1129.04 220.044 1118 233.667 1118L332.333 1118C345.956 1118 357 1129.04 357 1142.67L357 1241.33C357 1254.96 345.956 1266 332.333 1266L233.667 1266C220.044 1266 209 1254.96 209 1241.33Z" 
        fill={fillColor} 
        fill-rule="evenodd" 
        fill-opacity={fillOpacity}
      /></g></g>

      </svg>
  )
}

export default StopRecordingIcon