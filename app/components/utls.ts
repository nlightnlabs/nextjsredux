
import { pageData } from './pageData';

export const getMenuItems = async (pageData:any[]) => {
  let menuItems = pageData.filter(i => i.showOnMenu === true);
  console.log("menuItems",menuItems);
  return menuItems;
};

export const getSections = (menuItems: Object[]) => {
  const menuSets = new Set<string>();
  menuItems.map((item: any) => {
    menuSets.add(item.section);
  });
  const sections = Array.from(menuSets);
  console.log("sections",sections);
  return sections;
};
