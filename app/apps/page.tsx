import React from 'react'
import StoreProvider from '../redux/StoreProvider'
import AllApps from "./all_apps/page"

const page = () => {
  return (
    <div className="flex w-full h-full">
      <StoreProvider>
        <AllApps/>
      </StoreProvider>
    </div>
  )
}

export default page
