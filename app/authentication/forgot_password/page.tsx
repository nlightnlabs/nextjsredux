"use client"

import React, {useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '../../redux/hooks'
import { setUser, setUserLoggedIn } from '../../redux/slices/authSlice'
import { setCurrentPage } from '../../redux/slices/navSlice'
import * as iconsApi from "../../apis/icons"
import * as nlightnApi from "../../apis/nlightn"
import MultiInput from "../../components/MultiInput"
import {useRouter} from "next/navigation"

const ResetPassword = () => {

  const dispatch = useAppDispatch()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email:"",
    pwd:""
  })

  const [formClassList, setFormClassList] = useState("form-group")
  const [validationMsg, setValidationMsg] = useState("")
  const [validationClassName, setValidationClassName] = useState("d-none")

  // countdown 
  const [seconds, setSeconds] = useState(10);
  const [counterMsgClassName, setCounterMsgClassName] = useState("d-none")

  const handleChange = (e:any)=>{
      let {name, value} = e.target
      if(name=="email"){
        value = value.toString().toLowerCase()
      }
      setFormData({...formData,...{[name]:value}})
  }


  const handleSubmit = async (e:any)=>{
    
    const form = e.target

    const validateUser = async(email:string)=>{
      if(Object.keys(formData).length==0){
        setValidationMsg(`${String.fromCharCode(10060)} invalid email.`)
        setValidationClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
      }
      else{
      
        const tableName = 'users'
        const conditionalField =email
        const condition = 'email'

        try{
            const userRecord = await nlightnApi.getRecord(tableName,conditionalField,condition)
            if (userRecord.email == email){
              return true
            }else{
              return false
            }
        }catch(error){
            console.log(error)
        }
      }
    }


    if(e.nativeEvent.submitter.name==="backButton"){
   
      setFormClassList("form-group")
      let nextPage = "SignIn"

    }else{
      if(!form.checkValidity()){
        e.preventDefault();
      }else{
        // console.log(appData)
        const email:string = formData.email
        const userValidated = await validateUser(email)
        if(userValidated){

         const to = email
          const subject = "Password Reset"
          const message = "This is a response to your request to reset your password.  Please click the button below."
          const htmlPage = `<h3>Password Reset</h3><p>This is a response to your request to reset your password.  Please click the button below.</p><button onClick="https://nlightnlabs.net/RequestFlow/ResetPassword">Reset Password</button>`

          const params = {
            to: to,
            subject: subject,
            message: message,
            htmlPage: htmlPage
          }

          const emailSent = await nlightnApi.sendEmail(params)
          // console.log(emailSent)

          if(emailSent){
            setValidationMsg(`${String.fromCharCode(9989)} Account verified.  Password reset email sent to ${email}. \n\r If you do not receive an email within 5 minutes, please contact support@nlightnlabs.com`)
            setValidationClassName("text-success mt-0 mb-3 text-center animate__animated animate__fadeIn ")
            setCounterMsgClassName("d-block text-secondary text-center mt-0 mb-3 animate__animated animate__fadeIn")

            const startCountdown = () => {
              const interval = setInterval(() => {
                if (seconds > 0) {
                  setSeconds(prevSeconds => prevSeconds - 1);
                } else {
                  clearInterval(interval);
                }
              }, 1000);
            };
            startCountdown()

            setTimeout(()=>{
              dispatch(setCurrentPage("SignIn"))
            },10*1000)

          }else{
            // console.log(`unable to send email`)
          }
          

        }else{
            setValidationMsg(`${String.fromCharCode(10060)} No account was found for ${email}.`)
            setValidationClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
        }
      }
    }
}



const pageStyle ={
  height:"100vh", 
  width:"100vw",
  backgroundImage: "linear-gradient(0deg, rgb(200,225, 255), white)"
}


return (
  <div className="d-flex position-relative justify-content-center fade-in w-100" style={pageStyle}>

      <div className="d-flex position-absolute flex-column w-100" style={{top: "100px", maxWidth:"400px"}}>

        <h3 style={{color: "rgb(0,100,225)"}}>Reset Password</h3>
            
        <div className="d-flex flex-column bg-light border shadow p-3 rounded-2 justify-content-center">
          
        <div className="form-floating mb-3">
          <input id = "email" name= "email" type="email" className="form-control form-control text-primary" onChange={(e)=>handleChange(e)} placeholder="Username" required></input>
          <label htmlFor="username" className="form-label text-body-tertiary small">Email</label>
        </div>
        <div className={validationClassName}>{validationMsg}</div>
        <div className={counterMsgClassName}>Sending back to log in page in <span className="text-danger fw-bold">{seconds}</span> seconds</div>


        <div className="d-flex flex-column justify-content-center mt-3">
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
              <button name="resetPassword" className="btn btn-primary" data-bs-toggle="button" type="submit" onClick={(e)=>handleSubmit(e)}>Reset Password</button>
              <button name= "backButton" className="btn text-secondary" data-bs-toggle="button" onClick={(e)=>router.push("/authentication/sign_in")}>Back to Log In</button>
            </div>
          </div>
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

export default ResetPassword