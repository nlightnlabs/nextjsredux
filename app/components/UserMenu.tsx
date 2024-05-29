"use client"

import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '../redux/hooks'
import { setUser, setUserLoggedIn } from '../redux/slices/authSlice'
import { clearAllStorage } from '../redux/store'; // Import from centralized utility file
import {useRouter} from 'next/navigation'
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
    <div className="flex items-center justify-end relative" >

      <div 
        className="flex rounded-full border cursor-pointer"
          onClick={(e)=>setShowUserMenu(!showUserMenu)}
        >
          <Svg 
            iconName="ProfileIcon"
            fillColor = "lightgray"
            fillOpacity = "1"
            />
      </div>
        
        
        {showUserMenu && 
        <div
          className="flex absolute shadow-md top-[100px] right-[0px] rounded-sm p-3 w-[200px] justify-center fade-in" 
          style={UserMenuStyle}
          onMouseOver={(e)=>setShowUserMenu(true)}
          onMouseLeave={(e)=>setShowUserMenu(false)}
          >
          <div className="flex flex-column">
              {userLoggedIn ?
              <div className="flex flex-col justify-center text-gray-400">
                  <label >Signed in as: </label>
                  <label style={{fontWeight: "bold", color: "rgb(0,150,225)"}}>{user.full_name}</label>
                  <label style={{fontWeight: "bold", color: "rgb(0,150,225)"}}>{user.email}</label>
                  <div className="flex justify-center">
                      <button className="btn btn-outline-primary" style={{maxWidth: "100px", marginTop:"10px"}} onClick={(e)=>handleSignOut()}>Sign Out</button>
                  </div>
              </div>
              :
              <div className="flex flex-column justify-center" style={{color: "gray"}}>
                  <button className="btn btn-outline-primary" onClick={(e)=>handleSignIn()} >Sign In</button>
              </div>
            }
          </div>
          
      </div>}
    
    </div>

    
  )
}

export default UserMenu