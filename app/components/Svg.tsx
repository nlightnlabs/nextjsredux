import React from 'react';
import dynamic from 'next/dynamic';

interface SvgPropTypes {
  fillColor?: string;
  fillOpacity?: string;
  iconName: string;
  height?: string;
  width?: string;
  hoveredColor?: string;
  isHovered?: boolean;
  cursor?: string;
}

const Svg: React.FC<SvgPropTypes> = ({
  iconName,
  height,
  width,
  fillColor,
  fillOpacity,
  hoveredColor,
  isHovered,
  cursor,
}) => {
  const DynamicComponent = dynamic<React.FC<SvgPropTypes>>(
    () => import(`./svgs/${iconName}.tsx`),
    { ssr: true }
  );

  const IconStyle: React.CSSProperties = {
    fill: fillColor != null ? fillColor : 'white',
    fillOpacity: fillOpacity != null ? fillOpacity : '1',
    cursor: cursor != null ? cursor : 'pointer',
  };

  return (
      <DynamicComponent
        fillColor={fillColor}
        fillOpacity={fillOpacity}
      />
  );
};

export default Svg;








