'use client'

import React from 'react';
import Svg from './Svg'

interface AppProps {
  name: string;
  icon: string;
  id: string;
  label: string;
}

interface PropTypes {
  app: AppProps;
}

const handleClick = (name:string)=>{
  alert(name)
}

const AppCard = ({ app }:PropTypes) => {
  return (
    <div 
      className="flex w-full mt-2 border border-gray-50 rounded-md shadow-md p-2" 
      id={app.id}
      onClick={(e)=>handleClick(app.name)}
      >
      <img src = {app.icon}/>
      <div className="">{app.label}</div>
    </div>
  );
};

export default AppCard;
