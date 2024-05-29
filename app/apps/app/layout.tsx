
import Header from "@/app/components/Header";
import Menu from "@/app/components/Menu";
import * as pageData from '@/app/components/pageData';


export default async function RootLayout({children,}: {children: React.ReactNode;}) {

  const menuData:any = await pageData.getMenuItems();
  const menuItems = await menuData.menuItems
  const sections = menuData.sections

  return (
    <html lang="en">
      
      <body className="main-layout">
          <Header/>
          <div className="flex justify-between">
            <div className="w-[100%]">
              {children}
            </div>
            {<Menu menuItems={menuItems} sections={sections} colorTheme="nlightn labs"/>}
          </div>
      </body>
    </html>
  );
}

