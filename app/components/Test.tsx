"use server"

import React from 'react'
import * as nlightnApi from '../apis/nlightn'
import { ApiResponse } from '../types'
import { pageData } from './pageData';

export const getMenuItems = async (pageData: Object[]) => {
  let menuItems = pageData.filter(i => i.showOnMenu === true);
  await Promise.all(menuItems.map(item => {
    delete item.component;
  }));
  console.log("menuItems",menuItems);
  return menuItems;
};

export const getSections = (menuItems: Object[]) => {
  const menuSets = new Set<string>();
  menuItems.map((item: any) => {
    menuSets.add(item.section);
  });
  const menuList = Array.from(menuSets);
  console.log("menuList",menuList);
  return menuList;
};

const Test = async () => {

  const menuItems = await getMenuItems(pageData)
  const sections = getSections(menuItems)

  return (
    <div>
      {JSON.stringify(menuItems)}
      {JSON.stringify(sections)}
    </div>
  )
}

export default Test