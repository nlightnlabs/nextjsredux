"use client"

import React, {useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setAllAppsModule, setSelectedAppName, setSelectedApp } from '../../redux/slices/appsSlice'

import * as nlightnApi from '../../apis/nlightn'
import * as iconsApi from '../../apis/icons'

import Table from '../../components/Table'
import FloatingPanel from '../../components/FloatingPanel'


const AllApps = () => {

  const dispatch = useAppDispatch()
  const appName = useAppSelector((state)=>state.apps.selectedAppName)
  const companyName = useAppSelector((state)=>state.authentication.user.company_name) || "general_user"
  const folderPath = `${appName}/client_documents/${companyName}`

  const [view, setView] = useState("table")
  const [visualLayout, setVisualLayout] = useState([])
  const [tableData, setTableData] = useState([]);
  const [fields, setFields] = useState([])
  const [selectedRecords, setSelectedRecords] = useState<any[]>([])
  const [hoveredItem, setHoveredItem] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showViewForm, setShowViewForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [attachments, setAttachments] = useState([])
  

  const getTableData = async (tableName:string)=>{
    setWaiting(true)
    try{
      const response:any = await nlightnApi.getTable(tableName)
      setTableData(response.data)
      setWaiting(false)
    }catch(error){
      console.log("Could not fetdh data for: ",tableName)
    }
  }
      
  useEffect(()=>{
    getTableData("apps")
  },[])


    const handleDeleteRecords = ()=>{
        setShowDeleteForm(false)
    }

    
    const handleSelectedRows = (selectedRows:any)=>{
      setSelectedRecords(selectedRows)
    }

    const handleViewApp = ()=>{
      console.log(selectedRecords[0])
      dispatch(setSelectedApp(selectedRecords[0]))
    }


    const IconStyle = {
        height: "30px",
        width: "30px",
        cursor: "pointer",
        marginLeft: "5px",
        marginRight: "5px"
    }

   
  return (
    <div className="page-style w-full h-full fade-in">
        
        <div className="page-title">All Apps</div>

        <div className="flex flex-col w-full p-3">
        
        <div className="flex w-full justify-between items-center p-1">
            <div className="flex justify-start items-center">
                <img src={`${iconsApi.generalIcons}/table_icon.png`} style={IconStyle} onClick={(e)=>setView("table")}></img>
                <img src={`${iconsApi.generalIcons}/visual_design_icon.png`} style={IconStyle} onClick={(e)=>setView("layout")}></img>
            </div>
            <div className="flex justify-end items-center">
                { selectedRecords.length == 1 && 
                  <div className="flex items-center justify-end">        
                    <img title={"View Data"} style={IconStyle} src={`${iconsApi.appIcons}/view_icon.png`} onClick={()=>handleViewApp()}></img>
                  </div>
                }
                { selectedRecords.length >0 && 
                  <div className="flex items-center justify-end">        
                    <img title={"Delete Data"} style={IconStyle} src={`${iconsApi.appIcons}/trash_icon.png`} onClick={(e)=>setShowDeleteForm(true)}></img>
                  </div>
                }
                <img title={"Add Record"} style={IconStyle} src={`${iconsApi.appIcons}/add_icon.png`} onClick={(e)=>setShowAddForm(true)}></img>
            </div>
        </div>

        <div className="flex border p-1 h-full w-full overflow-auto bg-slate-100">
          {tableData.length>0  && view==="table" &&
              <Table 
                  data={tableData}
                  hiddenColumns = {["id","record_created","order", "name"]}
                  selectRows = {handleSelectedRows}
              />
          }
        </div>
        </div>


        {showDeleteForm && 
            <FloatingPanel
                width = "300px"
                height = "200px"
                displayPanel = {setShowDeleteForm}
                title="Confirm delete"
            >
                <div className="flex justify-center items-center w-full">
                    <div className="flex items-center justify-center">
                        <button className="btn btn-outline-secondary m-1" onClick={(e)=>setShowDeleteForm(false)}>Cancel</button>
                        <button className="btn btn-danger m-1" onClick={(e)=>handleDeleteRecords()}>Delete</button>
                    </div>
                </div>
         </FloatingPanel>
        }

        { showViewForm && 
            <FloatingPanel
              title={selectedRecords[0].name}
              height="50vh"
              width="50vw"
                displayPanel = {setShowViewForm}
            >
                {/* <PreviewDocument file={selectedFile}/> */}
         </FloatingPanel>
        }

      {waiting && 
            <FloatingPanel
                width = "300px"
                height = "200px"
                displayPanel = {setWaiting}
            >
            <div className="flex w-full items-center justify-center">
              <h4>Please wait...</h4>
            </div>
         </FloatingPanel>
        }
    </div>
  )
}

export default AllApps