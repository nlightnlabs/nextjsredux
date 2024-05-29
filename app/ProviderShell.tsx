import React from 'react'
import StoreProvider from './redux/StoreProvider'

const ProviderShell = ({children,}:{children: React.ReactNode;}) => {
  return (
    <StoreProvider>
        {children}
    </StoreProvider>
  )
  
}

export default ProviderShell