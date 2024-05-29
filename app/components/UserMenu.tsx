"use client"

import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '../redux/hooks'
import { setUser, setUserLoggedIn } from '../redux/slices/authSlice'
import { clearAllStorage } from '../redux/store'; // Import from centralized utility file
import {useRouter} from 'next/navigation'
import * as iconsApi from '../apis/icons'
import ProfileIcon from './svgs/ProfileIcon'
import ActiveLink from './ActiveLink';
import Svg from './Svg'

const UserMenu = () => {

  const dispatch = useAppDispatch()
  const userLoggedIn = useAppSelector((state)=>state.authentication.userLoggedIn)
  const user = useAppSelector((state)=>state.authentication.user)
  const router=useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const UserMenuStyle={
    border: "3px solid rgba(200,200,200,0.5)", 
    width: "200px",
    zIndex:999, 
    fontSize: "12px", 
    backgroundColor: "white",
    top: "65px"
  }
  
  const handleSignOut = ()=>{
    dispatch(setUser({}))
    dispatch(setUserLoggedIn(false))
    dispatch(clearAllStorage())
    router.push("/authentication")
  }

  const handleSignIn = ()=>{
    setShowUserMenu(false)
    router.push("/authentication")
  }



  return (
    <div className="flex items-center w-[50%] justify-end p-2 relative" >

      <div className="flex rounded-full border cursor-pointer" style={{height: "90%", width: "auto"}}>
        <ActiveLink href="/profile">
          <Svg 
            iconName="ProfileIcon"
            fillColor = "lightgray"
            fillOpacity = "1"
            />
        </ActiveLink>
      </div>
        
        
        {showUserMenu && 
        <div
          className="d-flex absolute shadow-md top-[100px] right-[0px] rounded-sm p-3 w-[200px] justify-center fade-in" 
          style={UserMenuStyle}
          onMouseOver={(e)=>setShowUserMenu(true)}
          onMouseLeave={(e)=>setShowUserMenu(false)}
          >
          <div className="d-flex flex-column">
              {userLoggedIn ?
              <div className="flex flex-col justify-center text-gray-400">
                  <label >Signed in as: </label>
                  <label style={{fontWeight: "bold", color: "rgb(0,150,225)"}}>{user.full_name}</label>
                  <label style={{fontWeight: "bold", color: "rgb(0,150,225)"}}>{user.email}</label>
                  <div className="d-flex justify-content-center">
                      <button className="btn btn-outline-primary" style={{maxWidth: "100px", marginTop:"10px"}} onClick={(e)=>handleSignOut()}>Sign Out</button>
                  </div>
              </div>
              :
              <div className="d-flex flex-column justify-content-center" style={{color: "gray"}}>
                  <button className="btn btn-outline-primary" onClick={(e)=>handleSignIn()} >Sign In</button>
              </div>
            }
          </div>
          
      </div>}
    
    </div>

    
  )
}

export default UserMenu