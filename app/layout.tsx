import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Menu from "./components/Menu";
import * as pageData from './components/pageData';


export const metadata: Metadata = {
  title: "Business Engagement System",
  description: "Deploy AI and managing all of your business processes with a single low-code system",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  const menuData:any = await pageData.getMenuItems();
  const menuItems = await menuData.menuItems
  const sections = menuData.sections

  return (
    <html lang="en">
      
      <body className="main-layout">
          <Header/>
          <div className="flex justify-between">
            <div className="w-full h-full">
              {children}
            </div>
            {<Menu menuItems={menuItems} sections={sections} colorTheme="nlightn labs"/>}
          </div>
      </body>
    </html>
  );
}
