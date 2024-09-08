import axios from "axios";
import * as formatValue from '../functions/formatValue'

interface Object {
  [key: string]: any;
}

export const baseURL = process.env.NODE_ENV==="production" ? "https://nlightnlabs.net" : "http://localhost:3001"
// export const baseURL = "https://nlightnlabs.net" 
console.log(baseURL)

export const serverConnection = axios.create({
  baseURL,
})


//General Query
export const getData = async (query:string)=>{
  try{
    const result = await serverConnection.post("/nlightn/db/query",{query})
    //console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    //console.log(error)
  }
}


//Get Table
export const getTable = async (tableName:string)=>{
    try{
      const result = await serverConnection.get(`/nlightn/db/table/${tableName}/bes`)
      // console.log(result.data)
      const {data,dataTypes} = await result.data
      return ({data,dataTypes})
    }catch(error){
      // console.log(error)
    }
  }

  //Get List
  export const getList = async (tableName:string,fieldName:string)=>{

    try{
      const result = await serverConnection.get(`/nlightn/db/list/${tableName}/${fieldName}`)
      const data = await result.data
      return (data)
    }catch(error){
      // console.log(error)
    }
  }


// Get  Conditional List
  export const getConditionalList = async (tableName:string,fieldName:string,conditionalField:string, condition:string)=>{
   
    try{
      const result = await serverConnection.get(`/nlightn/db/subList/${tableName}/${fieldName}/${conditionalField}/${condition}`)
      const data = await result.data
      return (data)
    }catch(error){
      console.log(error)
    }
  }


//Get Record
export const getRecord = async (tableName:string,conditionalField:string, condition:string)=>{

  try{
    const result = await serverConnection.post("/nlightn/db/getRecord",{tableName,conditionalField, condition})
    // console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    // console.log(error)
  }
}

//Get Records
export const getRecords = async (tableName:string, conditionalField:string, condition:string)=>{

  try{
    const result = await serverConnection.post("/nlightn/db/getRecords",{tableName,conditionalField, condition})
    //console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    //console.log(error)
  }
}

//Look up a single value
export const getValue = async (tableName:string,lookupField:string, conditionalField:string,conditionalValue:string)=>{
  
  try{
    const result = await serverConnection.get(`/nlightn/db/value/${tableName}/${lookupField}/${conditionalField}/${conditionalValue}`)
    //console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    //console.log(error)
  }
}


//Create New Record
export const addRecord = async (tableName:string, formData:string)=>{
  if(tableName.length > 0 && Object.entries(formData).length>0){
    try{
      const result = await serverConnection.post("/nlightn/db/addRecord",{tableName, formData})
      console.log(result)
      const data = await result.data
      return (data)
    }catch(error){
      console.log(error)
    }
  }else{
    alert("Please provide information for the new record")
  }
}

//Update Record
export const updateRecord = async (tableName:string,idField:string,recordId:string,formData:Object)=>{
  
    try{
      const result = await serverConnection.post("/nlightn/db/updateRecord",{tableName,idField,recordId,formData})
      //console.log(result)
      const data = await result.data
      return (data)
    }catch(error){
      //console.log(error)
    }
}

//Delete Record
export const deleteRecord = async (tableName:string,idField:string,recordId:string)=>{

  const params = {
    tableName,
    idField,
    recordId
}
  try{
    const result = await serverConnection.post("/nlightn/db/deleteRecord",{params})
    //console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    //console.log(error)
  }
}

//Authenticate User
export const authenticateUser = async (params:Object)=>{
  try{
    const submitLoggin = await serverConnection.post("/nlightn/db/authenticateUser",{params})
    const userValidated = submitLoggin.data
    return userValidated
  }catch(error){
      console.log(error)
  }
}

//Get User Info
export const getUserInfo = async (params:Object)=>{
  try{
    const getUserQuery = await serverConnection.post("/nlightn/db/userRecord",{params})
    const getUserQueryResonse = await getUserQuery.data;
    return getUserQueryResonse
  }catch(error){
    console.log(error)
  }
}

//Reset User Password
export const addUser = async (params:Object)=>{

  try{
    const result = await serverConnection.post("/nlightn/db/addUser",{params})
    //console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    //console.log(error)
  }
}


//Reset User Password
export const resetPassword = async (req:Object)=>{

  const params = {
    tableName: req.tableName,
    idField: req.idField,
    recordId: req.recordId,
    formData: req.formData
  }

  try{
    const result = await serverConnection.post("/nlightn/db/updateRecord",{params})
    //console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    //console.log(error)
  }
}


//Send Email
export const sendEmail = async (req:Object)=>{
    
  const params = {
      to: req.to,
      subject: req.subject,
      message: req.message,
      htmlPage: req.htmlPage
  }

  //console.log(params)
  try{
    const result = await serverConnection.post("/nlightn/sendEmail",{params})
    // console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    // console.log(error)
  }
}

//Ask GPT
export const askGPT = async (prompt:string)=>{

  console.log(prompt)

  try{
    const response = await serverConnection.post("/openai/gpt/ask",{prompt})
    return (response.data)
  }catch(error){
    // console.log(error)
  }
}


//openai/gpt/ classify
export const gptClassify = async (text:string, list:string[])=>{

  console.log("text",text)
  console.log("list",list)

  try{
    const response = await serverConnection.post("/openai/gpt/classify",{text, list})
    console.log(response.data)
    return (response.data)
  }catch(error){
    // console.log(error)
  }
}

//Generate Image
export const generateImage = async (prompt:string)=>{

  try{
    const result = await serverConnection.post("/openai/dalle/image",{prompt})
    // console.log(result)
    return (result.data[0].url)
  }catch(error){
    // console.log(error)
  }
}

//Scan Document
export const scanInvoice = async (documentText:string, record:Object)=>{
  
  const prompt = `The following is an invoice received from a supplier: ${documentText}. Fill in the values in this javascript object: ${JSON.stringify(record)} based on the information in the invoice. Leave a value blank if it can not be determined based on the invoice document received. Return response as javascript object. Be sure to return a properly structured json object with closed brackets and array sub elements if needed.`

  try{
    const result = await serverConnection.post("/openai/gpt/ask",{prompt})
    return (JSON.parse(result.data))
  }catch(error){
    // console.log(error)
  }
}


//Get list of all tables in database:
export const getAllTables = async()=>{
  const query= `SELECT table_name FROM information_schema.tables where table_schema = 'public';`
  try{
    const result = await serverConnection.post("/nlightn/query",{query})
    console.log(JSON.parse(result.data))
    return (JSON.parse(result.data))
  }catch(error){
    console.log(error)
  }
  
}

// show columsn
export const getColumnData = async(tableName:string)=>{

  const query= `SELECT column_name as name, data_type FROM information_schema.COLUMNS where TABLE_NAME = N'${tableName}';`
  try{
    const result = await serverConnection.post("/nlightn/db/query",{query})
    const data = result.data

    let fieldList:string[] = [] 
      data.map((item:any)=>{
        fieldList.push(item.name)
      })
    return ({data: data, fieldList:fieldList})
  }catch(error){
    console.log(error)
  }
}

export const updateActivityLog = async(app:string, recordId:string, userEmail:string, description:string)=>{
  
  const formData = {
    "app":app,
    "record_id":recordId,
    "user":userEmail,
    "description":description
  }
  
  const tableName = "activities"

  try{
    const result = await serverConnection.post("/nlightn/db/addRecord",{tableName, formData})
    // console.log(result)
    const data = await result.data
    return (data)
  }catch(error){
    // console.log(error)
  }
}


export const convertAudioToText = async (audioBlob: Blob) => {

  console.log('audioBlob:', audioBlob); // Log audioBlob to check its content

// Create a new FormData object
const formData = new FormData();
// Append data to the formData object
formData.append('file', audioBlob, 'audio.wav');

  try {
    const response = await serverConnection.post('/openai/whisper', formData)
    return response.data.text
  } catch (error) {
    console.error('Error sending data to backend:', error);
  }
 
};



// python api
export const pythonUrl = process.env.NODE_ENV==="production" ? "https://nlightnlabs.net/python" : "http://127.0.0.1:8000"

export const python = axios.create({
  baseURL: pythonUrl
})

export const pythonApp = async (requestPayload:any) =>{
  console.log("requestPayload",requestPayload)
  const response:any = await axios.post('http://127.0.0.1:8000/python/runApp', requestPayload)
  return response.data
}



//Upload files to AWS S3
export const uploadFiles = async (folder:string, attachments:Object[])=>{

  console.log("folder", folder)
  console.log("attachments",attachments)
  
  let updatedAttachments:Object[] = []

  try {
      await Promise.all(attachments.map(async (file) => {

        const filePath = `secure_file_transfer/${folder}/${file.name}` 
        
          const getUrl = await serverConnection.post(`/aws/getS3FolderUrl`, {filePath: filePath});
          const url = await getUrl.data;
          const fileUrl = await url.split("?")[0];

          await fetch(url, {
              method: "PUT",
              headers: {
                  "Content-Type": file.type,
              },
              body: file.data
          });

          let updatedFile:Object = {...file, ...{["url"]: fileUrl}};
          delete updatedFile.data
          updatedAttachments.push(updatedFile)
      }));

      return updatedAttachments

     } catch (error) {
        console.error("Error uploading file:", error);
    }

}


export const getFiles = async (folderPath:string)=>{

  const params = {
    bucketName: "nlightnlabs01",
    path: folderPath
  }

  try {
      const response = await serverConnection.post(`/aws/getFiles`, params);
      const data = await response.data;
      let files:Object[] = []
      data.forEach((item:any) => {
        const key = item.file.Key
        const fileName = key.split('/').pop(); // Get the file name
        const fileType = fileName.split('.').pop(); // Get the file type
        if (fileName.length>0){
            files.push({
            name: fileName, 
            type: fileType, 
            size: formatValue.formatFileSize(item.file.Size), 
            last_modified: formatValue.UTCToLocalDateTime(item.file.LastModified), 
            owner: item.file.Owner.DisplayName, 
            url: item.url.split("?")[0],
            key: key, 
            file_data: item.file_data,
            meta_data: item.meta_data
          })
        }
      });

      return files
  } catch (error) {
      console.error("Error uploading file:", error);
  }
}



export const deleteFiles = async (files:Object[])=>{

  let status = "OK"
  try{
    await Promise.all(files.map(async (item) => {
      const params = {
        Bucket: "nlightnlabs01",
        Key: item.key,
      }
        const response = await serverConnection.post('/aws/deleteFile', params);
        if(response.statusText !="OK"){
          status = response.statusText
        }
    }));
    return status
  }catch(error){
    console.error("Error deleting file:", error);
    return error
  }
   
}