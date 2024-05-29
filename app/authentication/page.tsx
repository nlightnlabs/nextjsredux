import React from 'react'
import SignIn from "./sign_in/page"
import StoreProvider from '../redux/StoreProvider'

const page = () => {
  return (
    <StoreProvider>
      <SignIn/>
    </StoreProvider>
  )
}

export default page