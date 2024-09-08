"use client"

import React, {useState} from 'react';
import UserMenu from './UserMenu';
import StoreProvider from '../redux/StoreProvider';
import Image from 'next/image';
import imageLoader from './imageLoader';
import Svg from './Svg';
import Menu from './Menu';


interface PropTypes{
  colorTheme: string;
  menuItems: Object[];
  sections: string[];
}

const Header = ({menuItems, sections, colorTheme}:PropTypes) => {

  const [showMenu, setShowMenu] = useState(false)  

  console.log(menuItems)
  console.log(sections)
  console.log(colorTheme)

  return (
    <div className="flex relative w-full items-center justify-between h-[75px]">
      <div className="flex items-center justify-start ms-3">
        <Image src="/nlightn_labs_logo.png" height={60} width={100} alt="nlightn labs logo" loader={imageLoader}/>
      </div>
      <div className="flex items-center justify-start ms-3" onClick={()=>setShowMenu(!showMenu)}>
        <Svg iconName="MenuIcon" fillColor="lightgray" fillOpacity="1" height="60px" width="60px"/>
      </div>
      <div className="flex absolute top-[75px] right-0 h-[100vh] z-50">
        {showMenu && <Menu menuItems={menuItems} sections={sections} colorTheme={colorTheme}/>}
      </div>
      
    </div>
  );
}

export default Header;

