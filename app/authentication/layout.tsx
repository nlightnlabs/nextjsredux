import React from 'react'
import StoreProvider from '../redux/StoreProvider'

export default async function RootLayout({children,}: {children: React.ReactNode;}) {

  return (
    <div>
      <StoreProvider>
          {children}
      </StoreProvider>
    </div>
  );
}