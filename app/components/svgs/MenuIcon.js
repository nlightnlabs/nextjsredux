import React from 'react';

const MenuIcon = (props) => {

  const iconName = props.iconName || ""
   const fillColor = props.fillColor || "gray"
   const fillOpacity = props.fillOpacity || "1"
  
   const style = {
    height: "100%",
    width: "100%"
  }
      
  return (
    <svg 
      viewBox = "0 0 74 73"
      width="74" 
      height="73" 
      xmlns="http://www.w3.org/2000/svg" 
      overflow="hidden"><g 
      transform="translate(-134 -97)"
      style = {style}
      >
    <g><g><g><g>

        <path 
          d="M143.25 120.5 171 120.5 198.75 120.5 198.75 111.5 143.25 111.5Z" 
          fill={fillColor}
          fillRule="nonzero" 
          fillOpacity={fillOpacity}
        />
        
        <path 
          d="M143.25 138.5 171 138.5 198.75 138.5 198.75 129.5 143.25 129.5Z" 
          fill={fillColor}
          fillRule="nonzero" 
          fillOpacity={fillOpacity}
        />
        
        <path 
          d="M143.25 156.5 171 156.5 198.75 156.5 198.75 147.5 143.25 147.5Z" 
          fill={fillColor}
          fillRule="nonzero" 
          fillOpacity={fillOpacity}
        /></g></g></g></g></g>

    </svg>
  )
}

export default MenuIcon