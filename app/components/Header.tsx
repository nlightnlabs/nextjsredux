import React from 'react'
import UserMenu from './UserMenu'
import StoreProvider from '../redux/StoreProvider'
import * as iconsApi from '../apis/icons'

const Header = async () => {
  return (
    <div className="flex w-full justify-between border-b p-2 h-[75px]">
      <div className="flex items-center h-[60px] w-[50%] justify-start">
        <img 
          src={`${iconsApi.generalIcons}/nlightn_labs_logo.png`} 
          style={{height: "90%", width: "auto"}}
          alt="nlightn labs logo" 
          className="ms-3"
        />
      </div>

      <div className="flex items-center w-[50%] justify-end me-3">
        <StoreProvider>
          <UserMenu />
        </StoreProvider>
      </div>
    </div>
  )
}

export default Header
