"use client"

import React, {useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '../../redux/hooks'
import { setUser, setUserLoggedIn } from '../../redux/slices/authSlice'
import { setCurrentPage } from '../../redux/slices/navSlice'
import * as iconsApi from "../../apis/icons"
import * as nlightnApi from "../../apis/nlightn"
import MultiInput from "../../components/MultiInput"
import {useRouter} from "next/navigation"

const SignIn = () => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const [logInErrorMsg, setLogInErrorMsg] = useState("")
    const [logInClassName, setLogInClassName] = useState("d-none")

    const [formData, setFormData] = useState({
      email:"",
      pwd:""
    })

  const handleChange=(e:any)=>{
    let {name, value} = e.target

    if(name=="email"){
        value = value.toString().toLowerCase()
      }

    setFormData({...formData,...{[name]:value}})
  }

  const validateUser = async()=>{
    if(Object.keys(formData).length===0){
      setLogInErrorMsg(`${String.fromCharCode(10060)} invalid user information.`)
      setLogInClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
    }
    else{
      const params = {
          email: formData.email,
          pwd: formData.pwd
      }
      const uservalidated = await nlightnApi.authenticateUser(params)
      return uservalidated
    }
      
  }

  const getUserInfo = async ()=>{
      const params = {
        email: formData.email
      }
      const userInfo = await nlightnApi.getUserInfo(params)
      return userInfo
    }

  const handleSubmit = async ()=>{

    const userValidated = await validateUser()
    console.log(userValidated)
    if(userValidated){  
        const user_data = await getUserInfo()
        dispatch(setUser(user_data))
        dispatch(setUserLoggedIn(true))
        router.push("/Home")
    }else{
        setLogInErrorMsg(`${String.fromCharCode(10060)} invalid user information.`)
        setLogInClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
    }
}
      

  const pageStyle ={
    height:"100vh", 
    width:"100vw",
    backgroundImage: "linear-gradient(0deg, rgb(200,225, 255), white)"
  }


  return (
    <div className="flex relative justify-center fade-in w-full" style={pageStyle}>
        
        <div className="flex absolute flex-col w-full" style={{top: "100px", maxWidth:"400px"}}>

            <h3 className="text-[24px]">Sign In</h3>

            <div className="flex bg-slate-50 rounded-md w-100 flex-col p-3 mt-1 shadow-md" >
                    <MultiInput
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange = {(e)=>handleChange(e)}
                        label="Email"
                    />
                   
                    <MultiInput
                        id="pwd"
                        name="pwd"
                        value={formData.pwd}
                        onChange = {(e)=>handleChange(e)}
                        label="Password"
                        type="password"
                    />

                    <div className={logInClassName}>{logInErrorMsg}</div>
   
                <div className="flex flex-col w-full mt-3">
                    <div className="flex justify-center w-full">
                        <button className="bg-blue-500 p-2 rounded-md text-white" onClick={()=>handleSubmit()}>Submit</button>
                    </div>
                    <label 
                        className="flex transition duration-200 ease-in-out justify-center mt-1 text-[14px] hover:text-blue-500"
                        style={{color: "gray", cursor: "pointer"}}
                        onClick={(e)=>router.push("/authentication/forgot_password")}
                        >
                        Forgot Password
                    </label>

                    <label 
                        className="flex transition duration-200 ease-in-out justify-center mt-1 text-[14px] hover:text-blue-500"
                        style={{color: "gray", cursor: "pointer"}}
                        onClick={(e)=>router.push("/authentication/sign_up")}
                        >
                        New User Sign Up
                    </label>

                </div>
                
            </div>

            <div className="mt-3 justify-content-center w-50 m-auto">
                 <img 
                    src={`${iconsApi.generalIcons}/nlightn_labs_logo_animated.gif`} 
                    style={{height:"50%", width:"aut"}}
                />      
            </div>
        </div>

    </div>
  )
}

export default SignIn