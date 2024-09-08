import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import * as pageData from './components/pageData';

export const metadata: Metadata = {
  title: "Business Engagement System",
  description: "Deploy AI and managing all of your business processes with a single low-code system",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  const menuData:any = await pageData.getMenuItems();
  const menuItems = menuData.menuItems;
  const sections = menuData.sections;

  return (
    <html lang="en" className="h=[100vh]">
      <body className="main-layout">
        {menuItems && sections && <Header menuItems={menuItems} sections={sections} colorTheme="nlightn labs"/>}
          <div className="flex w-full h-[100%] justify-between">
            <div className="flex border w-full h-[100%]">
              {children}
            </div>
          </div>
      </body>
    </html>
  );
}
