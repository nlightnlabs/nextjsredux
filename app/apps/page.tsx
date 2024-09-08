"use client"

import React from 'react'
import StoreProvider from '../redux/StoreProvider'
import AllApps from "./all_apps/page"
import App from "./app/page"
import { useRouter } from 'next/navigation'


const page = () => {

  const router = useRouter()
  const { appName } = router.query
  console.log("appName", appName)

  return (
    <div className="flex w-full h-full">
      <StoreProvider>
        <AllApps/>
      </StoreProvider>
    </div>
  )
}

export default page
