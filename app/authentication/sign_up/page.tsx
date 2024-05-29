"use client"

import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setUserLoggedIn } from '../../redux/slices/authSlice'
import { setCurrentPage } from '../../redux/slices/navSlice'
import * as iconsApi from "../../apis/icons"
import * as nlightnApi from "../../apis/nlightn"
import MultiInput from "../../components/MultiInput"
import {useRouter} from 'next/navigation'
import {Object} from '../../types'

const SignUp = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    pwd: ""
  })
 
  const [formClassList, setFormClassList] = useState("form-group needs-validation")
  const [emailErrorMsg, setEmailErrorMsg] = useState("Valid email")
  const [emailErrorClassName, setEmailErrorClassName] = useState("d-none text-active")
  const [emailValided, setEmailValidated] = useState(false)
  const [pwdErrorMsg, setPwdErrorMsg] = useState("Password matches")
  const [pwdErrorClassName, setPwdErrorClassName] = useState("d-none text-active")
  const [pwdValided, setPwdValidated] = useState(false)
  const [businessUnits, setBusinessUnits] = useState<any>([])

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const handleChange = (e:any)=>{
      let {name, value} = e.target
      if(name=="email"){
        value = value.toString().toLowerCase()
      }
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }

  const handleBlur=(e:any)=>{
    const {name, value} = e.target

    if(name=="email"){
      let email = formData.email.toString()
        if(email.search("@")<=0 || email.search(/\./g)<=0){
          setEmailErrorMsg(`${String.fromCharCode(10060)} Invalid email`)
          setEmailErrorClassName("d-block text-danger fs-small mt-2")
          setEmailValidated(false)
      }else{
          setEmailErrorMsg(`${String.fromCharCode(9989)} Valid email`)
          setEmailErrorClassName("X d-block text-success fs-small mt-2")
          setEmailValidated(true)
      }        
    }

    if (name=="confirm_pwd"){
      const pwd = formData.pwd
      const confirmPwd = value
      if(confirmPwd!==pwd){
          setPwdErrorMsg(`${String.fromCharCode(10060)} Password doesn't match`)
          setPwdErrorClassName("d-block text-danger fs-small mt-2")
          setPwdValidated(false)
      }else{
          setPwdErrorMsg(`${String.fromCharCode(9989)} Password matches`)
          setPwdErrorClassName("X d-block text-success fs-small mt-2")
          setPwdValidated(true)
      }
  }
  }
  const handleSubmit = async (e:any)=>{
    
    e.preventDefault()
    const form = e.target
    
  
      if(!form.checkValidity() || !emailValided || !pwdValided ){
        e.preventDefault();
      }
      else{
          const params = formData
          console.log(formData)
          try{
            const response = await nlightnApi.addUser(params)
            console.log(response)
            alert(response)

            if(response =="User Exists"){
                alert("User account exists. Please re-enter a different email.")

            }else{
              dispatch(setUser(formData))
              dispatch(setUserLoggedIn(true))
              dispatch(setCurrentPage("Home"))
              router.push("/")
          }
          }
          catch(error){
            console.log(error)
          }
      }
      setFormClassList('form-group was-validated')
    
}
const getBusinessUnits = async () => {
  try {
    const response:any = await nlightnApi.getTable("business_units");
    const businessUnitData = response.data;

    const businessUnits : string[] = []
    businessUnitData.map((item:any)=>{
      businessUnits.push(item.name)
    })
    setBusinessUnits(businessUnits);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(()=>{
    getBusinessUnits()
  },[])

  const pageStyle ={
    height:"100vh", 
    width:"100vw",
    backgroundImage: "linear-gradient(0deg, rgb(200,225, 255), white)"
  }


  return (
    <div className="flex relative justify-center fade-in w-full" style={pageStyle}>
        
        <div className="flex absolute flex-col w-full" style={{top: "100px", maxWidth:"400px"}}>
          
        <h3 className="text-[24px]">New User Sign Up</h3>
          
          <div className="flex flex-col bg-gray-100 border shadow-md p-3 rounded-2 justify-center">
          
          <div  className="flex flex-col" style={{height: "500px", overflowY:"auto"}}>

          <div className="flex w-full flex-col mb-3 p-1">
                <input id = "email" name= "email" type="email" className="form-control form-control text-primary" onChange={handleChange} onBlur={handleBlur} placeholder="Email" required></input>
                <div className={emailErrorClassName} style={{fontSize: 12}}>{emailErrorMsg}</div>
            </div>

            <div className="flex w-full mb-3 p-1">
              <div className="form-floating w-50 me-1">
                <input id = "pwd" name= "pwd" type ="password" className="form-control form-control text-primary" onChange={handleChange}  placeholder="Password" required></input>
              </div>
              <div className="form-floating w-50 ms-1">
                  <input id = "confirm_pwd" name= "confirm_pwd" type ="password" className="form-control form-control text-primary" onBlur={handleBlur} placeholder="Confirm Password" required></input>
                <div className={pwdErrorClassName} style={{fontSize: 12}}>{pwdErrorMsg}</div>
              </div>
            </div>

            <div className="flex w-full justify-between mb-3 p-1">
              
              <input id = "first_name" name= "first_name" type="text" className="flex w- m-1 flex-col mb-3 p-2" onChange={handleChange} placeholder="First Name" required></input>
              <input id = "last_name" name= "last_name" type="text" className="flex w-full m-1 flex-col mb-3 p-2" onChange={handleChange} placeholder="Last Name" required></input>
    
            </div>

            <input id = "company_name" name= "company_name" type="text"  className="flex w- m-1 flex-col mb-3 p-2"  onChange={handleChange} placeholder="Company name" required></input>
            <input id = "job_title" name= "job_title" type="text"  className="flex w- m-1 flex-col mb-3 p-2"  onChange={handleChange} placeholder="Job Title"></input>

            <div>
              <label>Business Unit:</label>
              <select 
                id = "business_unit" 
                name = "business_unit" 
                className="flex w- m-1 flex-col mb-3 p-2" 
                onChange={handleChange} 
                >
                <option value="" style={{color: "lightgray"}}></option>
                {businessUnits.map((item:string)=>(
                  <option className="option light" key={businessUnits.indexOf(item)+1}>{item}</option>
                ))}
              </select>
              </div>

              <input id = "mobile_phone" name= "mobile_phone" type="tel" className="flex w- m-1 flex-col mb-3 p-2" onChange={handleChange} placeholder="Mobile Phone"></input>


            </div>
            
            <div className="d-flex flex-column justify-content-center mt-3">

              <div className="d-flex justify-content-center">
                  <button name="signUpButton" className="btn btn-primary" data-bs-toggle="button" type="submit" onClick={(e)=>handleSubmit(e)}>Sign Up</button>
              </div>

              <label 
                        className="d-flex justify-content-center mt-3 hovered"
                        style={{color: "gray", cursor: "pointer"}}
                        onClick={(e)=>router.push("/authenticate/forgot_password")}
                        >
                        Forgot Password
                    </label>

                    <label 
                        className="d-flex justify-content-center mt-1 hovered"
                        style={{color: "gray", cursor: "pointer"}}
                        onClick={(e)=>router.push("/authenticate/sign_up")}
                        >
                        Sign In
                    </label>

            </div>

          </div>
           
          <div className="mt-3 justify-content-center w-50 m-auto">
                 <img 
                    src={`${iconsApi.generalIcons}/nlightn_labs_logo_animated.gif`} 
                    style={{height:"100%", width:"100%"}}
                />      
          </div>

      </div>
 
    </div>
  )
}

export default SignUp