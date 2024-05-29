"use client"

import React, { useState } from 'react';
import { Object } from '../types';
import Svg from './Svg';
import { useAppSelector, useAppDispatch, useAppStore } from '../redux/hooks';
import ActiveLink from './ActiveLink';
import Link from 'next/link'
import Menu from './Menu';


interface MenuItemsPropTypes {
  item: Object;
  isExpanded: boolean;
  labelColor: string;
  iconColor: string;
  hoverColor: string;
  iconHoverColor: string;
  labelHoverColor: string;
  MenuItemStyle:  React.CSSProperties;
  MenuItemLabelStyle:  React.CSSProperties;
    MenuIconStyle: React.CSSProperties;
}

const MenuItem = (props:MenuItemsPropTypes) => {

  const {
    item,
    labelColor,
    iconColor,
    isExpanded,
    hoverColor,
    iconHoverColor,
    labelHoverColor,
    MenuItemStyle,
    MenuItemLabelStyle,
    MenuIconStyle,
  } = props;

  const [hoveredItem, setHoveredItem] = useState('none');

  const hover = (e: React.MouseEvent<HTMLElement>, itemName: string) => {
    setHoveredItem(e.type === 'mouseover' ? itemName : 'none');
  };

  return (
    <Link href={item.link}>
    <div
      title={item.label}
      id={`menu_item_${item.name}`}
      data-name={item.name} // Use data-name instead of name
      className={`flex items-center ${
        !isExpanded ? 'justify-content-center' : 'justify-content-start'
      }`}
      style={{
        ...MenuItemStyle,
        backgroundColor: hoveredItem === item.name ? hoverColor : MenuItemStyle.backgroundColor,
        color: hoveredItem === item.name ? hoverColor : labelColor,
        justifyContent: isExpanded ? 'flex-start' : 'center',
      }}
      key={item.id}
      onMouseOver={(e) => hover(e, item.name)}
      onMouseLeave={(e) => setHoveredItem('')}
    >
      <div 
        style={{height: MenuIconStyle.height, width: MenuIconStyle.width}}>
        <Svg
          iconName={item.icon}
          isHovered={hoveredItem === item.name ? true : false}
          fillColor={hoveredItem === item.name ? iconHoverColor : iconColor}
          fillOpacity={`${MenuIconStyle.opacity}`} 
        />
      </div>

      {isExpanded && (
        <div
          id={`menu_item_${item.name}_label`}
          data-name={item.name} // Use data-name instead of name
          className="d-flex ms-2"
          style={{
            ...MenuItemLabelStyle,
            color: hoveredItem === item.name ? labelHoverColor : labelColor,
          }}
        >
          {item.label}
        </div>
      )}
    </div>
    </Link>
  );
};

export default MenuItem;

