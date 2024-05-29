import { Object } from "../types";

export const pageData:Object[] = [
  { id: 1, section: 1, name: "Home", label: "Home", icon: "HomeIcon", link: "/", showOnMenu: true},
  { id: 2, section: 1, name: "Profile", label: "Profile", icon: "ProfileIcon", link: "/profile", showOnMenu: true},
  { id: 3, section: 1, name: "Settings", label: "Settings",icon: "SettingsIcon", link: "/settings", showOnMenu: true},
  { id: 4, section: 2, name: "Apps", label: "Apps", icon: "AppIcon", link: "/apps", showOnMenu: true },
  { id: 5, section: 2, name: "DataManagement", label: "Data Management", icon: "DatabaseIcon", link: "/data_management", showOnMenu: true },
  { id: 6, section: 2, name: "Integrations", label: "Integrations", icon: "IntegrationsIcon", link: "/integrations", showOnMenu: true},
  { id: 7, section: 2, name: "Models", label: "Models", icon: "ModelIcon", link: "/models", showOnMenu: true},
  { id: 8, section: 2, name: "Workflows", label: "Workflows", icon: "WorkflowIcon", link: "/workflows", showOnMenu: true},
  { id: 9, section: 2, name: "Agents", label: "Agents", icon: "BotIcon", link: "/agents", showOnMenu: true}
];

export const getMenuItems = async () => {
  let menuItems = pageData.filter(i => i.showOnMenu === true);

  const menuSets = new Set<string>();
  menuItems.map((item: any) => {
    menuSets.add(item.section);
  });
  const sections = Array.from(menuSets);

  return {menuItems,sections}
};
