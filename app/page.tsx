"use client";
import React, { useState, useEffect, useRef } from "react";
import {useRouter} from 'next/navigation'
import { aiResponse } from "./utils/gpt";
import AnalysisSummaryCharts from "./components/AnalysisSummaryCharts";
import PromptInput from './components/PromptInput'
import * as nlightnApi from './apis/nlightn'
import {commonTasks} from './components/commonQuestions'


const MainTextPrompt = () => {

  const router = useRouter()

  const [response, setResponse] = useState<any>(null)

  const handleSubmit = async (textPrompt:string)=>{
    const response:any = await aiResponse(textPrompt)
    console.log("gpt response",response)
    if (response !=null){
      setResponse(response)
    }
    
  }

  const handleClick = ()=>{
      router.push("/data_management")
  }

  const [apps, setApps] = useState([])
  const [businessProcesses, setBusinessProcesses] = useState([])
  const [announcements, setAnnouncements] = useState([])

  const getApps = async ()=>{
    const response:any = await nlightnApi.getTable("apps")
    const apps = response.data
    setApps(apps)

    const businessProcessSet = new Set()
    apps.map((item:any)=>(
      businessProcessSet.add(item.business_process)
    ))
    const businessProcessList:any = Array.from(businessProcessSet)
    setBusinessProcesses(businessProcessList)
  }

  const getAnnouncements = async ()=>{
    const response:any = await nlightnApi.getTable("announcements")
    const announcements = response.data
    setAnnouncements(announcements)
    return announcements
  }

  const handleAppClick = (appName:string)=>{
    router.push({
      pathname: '/apps',
      query: { "appName": appName},
    } as any)
  }

  // const [currentAnnouncement, setCurrentAnnouncement] = useState<any>(null)
  
  // let currentAnnouncementId = 0
  // const rotateAnnouncements = async ()=>{
  //   const announcements = await getAnnouncements()
  //   console.log(announcements)
  //   setInterval(()=>{
  //     currentAnnouncementId = (currentAnnouncementId+1)%announcements.length
  //     console.log(currentAnnouncementId)
  //     console.log(announcements[currentAnnouncementId])
  //     setCurrentAnnouncement(announcements[currentAnnouncementId])
  //   },3000)
  // }


  useEffect(()=>{
    getApps()
    getAnnouncements()
    // rotateAnnouncements()
  },[])


  return (
    <div className="w-full flex-col justify-center p-5">

      <div style={{ transition: "0.5s" }} className="m-auto size-full lg:size-3/4">
        
        <PromptInput returnResponse = {(textPrompt)=>handleSubmit(textPrompt)} />

        <div className="flex flex-col mt-2 p-1 text-gray-400">
          <label className="flex flex-wrap justify-left border-b pb-1">Common Tasks: </label>
          
          <div className="flex flex-wrap text-[11px] p-1">
              {
                commonTasks.map((item, index)=>(
                  <button 
                    key={index} 
                    id={item.id}
                    name={item.name}
                    style={{transition: "0.5s"}} 
                    className="flex p-2 text-blue-400 border rounded-xl mt-2 hover:bg-blue-400 hover:text-white m-1 hover:scale-110" 
                    onClick={(e)=>handleSubmit(item.name)}
                    >
                      {item.label}
                    </button>
                ))
              }  
            </div>
        </div>

        <div className="flex flex-col mt-2 p-1 text-gray-400">
          
          <label className="flex flex-wrap justify-left border-b pb-1 mb-1">Manage Your Business: </label>
          {response ==null &&
            <div className="w-full h-[60vh] overflow-auto scroll-hidden"> 

              <div className="flex flex-col h-[1000px]">
                {
                  businessProcesses.map((bp,index)=>(
                    <div key={index} className="flex-col mt-2 border rounded-md">
                      <div className="text-[18px] font-bold p-2 border-b bg-gray-50 border-b-gray-200 text-black">{bp}</div>
                      <div className="flex flex-wrap p-3 rounded-md justify-center">
                      
                      {apps.map((item:any)=>(
                        item.business_process == bp && 
                          <div 
                              key={item.id} 
                              style={{transition: "0.5s"}} 
                              className="flex flex-col items-center p-1 m-1 h-[50px] w-[100px] justify-center hover:scale-110 hover:cursor-pointer" 
                              onClick={()=>handleAppClick(item.name)}
                            >
                            <img src={item.icon} style={{height:"30px"}}></img>
                            <div className="text-gray-400 text-[12px] w-full text-center text-wrap">{item.label}</div>
                          </div>
                      ))}

                      </div>
                    </div>
                  ))
                }
                </div>
            </div>
          }

        { response !=null && 
          <div className="flex flex-col  justify-center mt-[20px]">
          <label className="text-orange-400 mb-5">NOTE: The following is based on generic data.  
            <span onClick={(e)=>handleClick()} className="text-blue-500 text-decoration-underline flex-wrap cursor-pointer">Click here</span> to add your own data
          </label>
            <AnalysisSummaryCharts data={response}/>
          </div>
        }

        </div>

        

      </div>
      

     

    </div>
  );
};

export default MainTextPrompt;

