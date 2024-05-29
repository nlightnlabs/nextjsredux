"use client"

import React, {useState, useEffect, useMemo, useCallback} from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { SortDirection} from 'ag-grid-community';
import {toProperCase} from '../functions/formatValue'

interface PropTypes{
  data: any[];
  columnWidths?: any[];
  filterableColumns?: string[];
  hiddenColumns?: string[];
  sortableColumns?: any[];
  sortingOrder?: string[];
  selectRows?: (rows:any[])=>void;
  onCellClicked?: (cell:any)=>void;
}


const Table = (props:PropTypes) => {
    const data = props.data
    const columnWidths = props.columnWidths || []
    const filterableColumns = props.filterableColumns || []
    const hiddenColumns = props.hiddenColumns || []
    const sortableColumns = props.sortableColumns !=null ? props.sortableColumns : Object.keys((props.data)[0])
    const sortingOrder = props.sortingOrder || []
    const selectRows = props.selectRows
    const onCellClicked = props.onCellClicked 

    const [tableData, setTableData] = useState<any>([]);
    const [fields, setFields] = useState<any>([]);
  
    
    const getTableData = async ()=>{

      let selectField = {
        field: "select", 
        headerName: "", 
        cellStyle: { textAlign: 'center' },
        width: 20,
        filter: false,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        resize: false
    }

      let fieldList:any = [selectField]
        if(data.length>0){
            Object.keys(data[0]).map((field:string,index:number)=>{
                fieldList.push({
                  field: field, 
                  headerName: toProperCase(field.replace(/"_"/g," ")), 
                  width: columnWidths.find(i=>i.columnName===field) && columnWidths.find(i=>i.columnName===field).width,
                  filter: filterableColumns.includes(field)? true : true, 
                  sortable: sortableColumns.find(i=>i.name===field) ? true: false, 
                  sort: sortableColumns.find(i=>i.name===field) &&  sortableColumns.find(i=>i.name===field).order, 
                  hide: hiddenColumns.includes(field)? true : false, 
                  suppressSizeToFit: hiddenColumns.includes(field) ? true : false,
                })
            })
            
            setFields(fieldList)
        }

        setTableData(data);
    }

   
      
  useEffect(()=>{
    getTableData()
  },[props.data])


    const handleCellClick = (e:any) => {
      if(typeof onCellClicked === "function"){
        onCellClicked(e.data)
      }
    }
    
    const [selectedRows, setSelectedRows] = useState([])

    const gridOptions = {

      sortingOrder: ['asc', 'desc'] as SortDirection[],

      onGridReady: (params:any) => {
        params.api.sizeColumnsToFit();
      },
      rowClassRules: {
        'selected-row': (params:any) => params.node.isSelected(),
      },

      onSelectionChanged: (event:any) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedRowData = selectedNodes.map((node:any) => node.data);
        setSelectedRows(selectedRowData);
        console.log('Selected Rows:', selectedRowData);
      },

      // getRowStyle: (params:any) => {
      //   if (params.node && params.node.isSelected()) {
      //     return { background: 'gray' }; // Change the background color to highlight the row
      //   }
      //   return null; // No style change
      // },

    };

    useEffect(()=>{
      if(typeof selectRows ==="function"){
        selectRows(selectedRows)
      }
    },[selectedRows])
  
  return (
    <div className="flex w-full h-full ag-theme-quartz">
        {tableData &&
         <AgGridReact
            rowData={tableData}
            columnDefs={fields}
            gridOptions = {gridOptions}
        />}
    </div>
  )
}

export default Table