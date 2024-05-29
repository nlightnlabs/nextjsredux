"use client"
import React from 'react'

interface HandleFormType{
  handleForm: ()=>void;
}

const Form = ({handleForm}:HandleFormType) => {

  const fetchData = ()=>{

  }

  return (
    <div className="flex w-full p-3">
      <form action={fetchData}>
        <div className="flex w-full flex-col">
          <label>Table name</label>
          <input name="table_name"></input>
          <button className="bg-blue-600 text-white mt-3 rounded-md p-2">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Form

