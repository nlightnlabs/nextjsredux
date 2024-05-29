"use client";

import React from 'react';

import AngleArrowIcon from "./svgs/AngleArrowIcon";
import AppIcon from "./svgs/AppIcon";
import BotIcon from "./svgs/BotIcon";
import CloseIcon from "./svgs/CloseIcon";
import DatabaseIcon from "./svgs/DatabaseIcon";
import FilesIcon from "./svgs/FilesIcon";
import HomeIcon from "./svgs/HomeIcon.js";
import IntegrationsIcon from "./svgs/IntegrationsIcon";
import ModelIcon from "./svgs/ModelIcon";
import ProfileIcon from "./svgs/ProfileIcon";
import SettingsIcon from "./svgs/SettingsIcon";
import WorkflowIcon from "./svgs/WorkflowIcon";
import GeneralIcon from "./svgs/GeneralIcon";

const Svg = (props) => {

  const iconName = props.iconName || "GeneralIcon";
  const fillColor = props.fillColor || "lightgray";
  const fillOpacity = props.fillColor || "1";
  const height = props.height || "30px";
  const width = props.width || "30px";

  const images = {
    AngleArrowIcon: AngleArrowIcon,
    AppIcon: AppIcon,
    BotIcon: BotIcon,
    CloseIcon: CloseIcon,
    DatabaseIcon: DatabaseIcon,
    FilesIcon: FilesIcon,
    HomeIcon: HomeIcon,
    IntegrationsIcon: IntegrationsIcon,
    ModelIcon: ModelIcon,
    ProfileIcon: ProfileIcon,
    SettingsIcon: SettingsIcon,
    WorkflowIcon: WorkflowIcon,
    GeneralIcon: GeneralIcon,
  };

  const SvgComponent = images[iconName];

  if (!SvgComponent) {
    return null; // Or you can return a default component or an error message
  }

  return (
    <div style={{height: height, width: width}} >
      <SvgComponent fillColor={fillColor} fillOpacity={fillOpacity} />
    </div>
  );
};

export default Svg;











