import React from 'react';

const SendIcon = (props) => {
  
    const iconName = props.iconName || ""
   const fillColor = props.fillColor || "gray"
   const fillOpacity = props.fillOpacity || "1"
  
   const style = {
    height: "100%",
    width: "100%"
  }

    return (
        <svg 
            viewBox="0 0 303 302"
            width="303" 
            height="302" 
            xmlns="http://www.w3.org/2000/svg" 
            overflow="hidden"
            style={style}
            >
        <g transform="translate(-916 -1040)"><g>
            <path d="M942.5 1068.5 1193.5 1187.74 946.865 1315.5 1001.43 1185.61 942.5 1068.5Z" 
                stroke={fillColor}  
                strokeWidth="27.5" 
                strokeLinecap="butt" 
                strokeLinejoin="miter" 
                strokeMiterlimit="8" 
                strokeOpacity="1" 
                fill={fillColor} 
                fillRule="evenodd" 
                fillOpacity={fillOpacity}
            />                    
            
            <path 
                d="M1193.43 1187.63 1001.5 1185.5" 
                stroke={fillColor}
                strokeWidth="20.625" 
                strokeLinecap="butt" 
                strokeLinejoin="miter" 
                strokeMiterlimit="8" 
                strokeOpacity={fillOpacity}
                fill={fillColor} 
                fillRule="evenodd"/>
            </g></g>
        </svg>
    )
  }
  
  export default SendIcon