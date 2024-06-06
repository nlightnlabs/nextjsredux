import React from 'react';
import UserMenu from './UserMenu';
import StoreProvider from '../redux/StoreProvider';
import Image from 'next/image';
import Svg from './Svg';

const Header = () => {
  return (
    <div className="flex w-full items-center justify-between border-b h-[75px]">
      <div className="flex items-center justify-start ms-3">
        <Image src="/nlightn_labs_logo.png" height={60} width={100} alt="nlightn labs logo" />
      </div>
      <div className="flex items-center w-[75px] justify-end pe-3">
        <StoreProvider>
          <Svg iconName="MenuIcon" fillColor="lightgray" fillOpacity="1" height="50px" width="50px" />
        </StoreProvider>
      </div>
    </div>
  );
}

export default Header;

