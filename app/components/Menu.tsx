"use client"

import React, { useState, useEffect, useRef, createRef } from 'react';
import { Object } from '../types.js';
import { colorThemes } from './colorthemes';
import MenuItem from './MenuItem';
import StoreProvider from '../redux/StoreProvider';
import Svg from './Svg'


interface PropTypes {
  colorTheme: string;
  menuItems: Object[];
  sections: String[];
}

const Menu = ({menuItems, sections, colorTheme}: PropTypes) => {
  
  const [isExpanded, setExpanded] = useState(false);

  // Function to dynamically create refs based on the names or IDs
  const menuItemRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const menuItemIconRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const menuItemLabelRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

  const createRefs = async (menuItems: Object[]) => {
    let refList: Record<string, React.RefObject<HTMLDivElement>> = {};
    menuItems.forEach((item: any) => {
      refList[item.name] = createRef();
    });
    menuItemRefs.current = refList;

    refList = {};
    menuItems.forEach((item: any) => {
      refList[item.name] = createRef();
    });
    menuItemIconRefs.current = refList;

    refList = {};
    menuItems.forEach((item: any) => {
      refList[item.name] = createRef();
    });
    menuItemLabelRefs.current = refList;
  };

  const [menuColor, setMenuColor] = useState('white');
  const [iconColor, setIconColor] = useState('lightgray');
  const [labelColor, setLabelColor] = useState('white');
  const [hoverColor, setHoverColor] = useState('lightgray');
  const [iconHoverColor, setIconHoverColor] = useState('gray');
  const [labelHoverColor, setLabelHoverColor] = useState('gray');

  const getThemeColors = (colorThemes: any[]) => {
    const theme = colorThemes.find(i => i.name === colorTheme);
    if (theme) {
      setMenuColor(theme.menuColor);
      setIconColor(theme.iconColor);
      setLabelColor(theme.labelColor);
      setHoverColor(theme.hoverColor);
      setIconHoverColor(theme.iconHoverColor);
      setLabelHoverColor(theme.labelHoverColor);
    }
  };

  useEffect(() => {
    createRefs(menuItems);
    getThemeColors(colorThemes);
  }, [menuItems]);

  const MenuStyle: React.CSSProperties = {
    height: '100%',
    width: isExpanded ? '250px' : '50px',
    backgroundImage: menuColor,
    transition: '0.2s',
    color: labelColor,
    right: "0px",
  };

  const MenuSectionStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: '20px',
  };


  const MenuItemStyle: React.CSSProperties = {
    display: "flex",
    width: '100%',
    height: '100%',
    padding: '5px',
    cursor: 'pointer',
    marginBottom: '5px',
    backgroundColor: 'rgba(1,1,1,0)',
    alignItems: "center",
    justifyContent: "flex-start"
  };
  
 
  const MenuItemLabelStyle:React.CSSProperties={
    display: "flex",
    color: labelColor,
    cursor: 'pointer',
    alignItems: "center",
    justifyContent: "flex-start"
  }

  const MenuIconStyle: React.CSSProperties = {
    display: "flex",
    height: '30px',
    width: '30px',
    opacity: '1',
    color: iconColor,
    cursor: 'pointer',
    alignItems: "center",
    justifyContent: "center"
  };

  return (
    <StoreProvider>
    <div
      className="flex flex-col"
      style={{
        ...MenuStyle,
        opacity: isExpanded ? 0.75 : 1,
      }}
    >
      <div 
        className={`flex 
          ${isExpanded? "justify-start": "justify-center"} 
          items-center border-b border-b-${labelColor} 
          bg-[rgb(0,100,225)] opacity-75
        ` }
        >
      <div
        onClick={() => setExpanded(!isExpanded)}
        style={{
          ...MenuIconStyle,
          transform: isExpanded ? 'scaleX(1)' : 'scaleX(-1)',
        }}
      >
        <Svg iconName="AngleArrowIcon" fillColor={iconColor} fillOpacity="1" />
      </div>
        {
          isExpanded &&<label className="flex ms-1" style={MenuItemLabelStyle}>(Srink Menu)</label>
        }
      </div>

      <div>
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex flex-col w-full"
            style={{
              ...MenuSectionStyle,
              borderTop: index > 0 ? `1px solid ${labelColor}` : `1px solid rgba(0,0,0,0)` ,
            }}
          >
            {menuItems.map((item: Object, index: number) => (
              item.section === section && 
              <MenuItem 
                key={index} 
                item={item} 
                MenuItemStyle={MenuItemStyle}
                MenuItemLabelStyle={MenuItemLabelStyle}
                MenuIconStyle={MenuIconStyle}
                isExpanded={isExpanded} 
                labelColor={labelColor} 
                iconColor={iconColor} 
                hoverColor={hoverColor} 
                iconHoverColor={iconHoverColor} 
                labelHoverColor={labelHoverColor} 
                />
            ))}
          </div>
        ))}
      </div>
    </div>
    </StoreProvider>
  );
};

export default Menu;
