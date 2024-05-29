"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const Svg = ({
  iconName,
  fillColor,
  fillOpacity,
}) => {
  const DynamicComponent = dynamic(() => import(`./svgs/${iconName}.jsx`), {
    ssr: false, // Set ssr to false if your SVGs are client-side only
  });

  return (
    <DynamicComponent
      fillColor={fillColor}
      fillOpacity={fillOpacity}
      iconName={iconName}
    />
  );
};

export default Svg;










