import React from 'react'
import BarChart from './BarChart'

interface PropTypes{
    data: any[];
}

const AnalysisSummaryCharts = ({data}:PropTypes) => {

  console.log(data)

  return (
    <div className="flex w-full flex-col overflow-auto scroll-hidden h-[1000px]">

        {data.length ==1?
          <div className="flex text-[20px] text-blue-500">{data[0]}</div>
        :
          data.length > 1 && data.map((item:any, index:number)=>(
            item.chart_type === "label" ?
            <div key={index} className="flex w-full mt-[20px] justify-center items-center p-3 flex-wrap">
              { 
                item.data.map((subItem:any, index2:number)=>(
                  index2>0 &&
                    <div className="flex justify-center flex-col w-[200px] h-[75px] border rounded-lg shadow-sm m-3">
                        <label className="flex items-center justify-center w-full text-[20px] font-bold text-green-600">{subItem.value.toFixed(2)}</label>
                        <label className="flex items-center justify-center w-full text-[14px] text-gray-400">{subItem.label}</label>
                    </div>
                ))
              }
            </div>
            
            :

            item.chart_type === "bar" ?
            <div className="flex-col mt-5">
              <div key={index} className="flex mt-[20px] justify-center p-5">
                <div className="w-full flex-wrap">
                  <label className="flex text-[16px]">{item.title}</label>
                    <div className="flex flex-wrap justify-center p-3 w-full">
                    { 
                      item.data.map((subItem:any, index2:number)=>(
                        index2>0 &&
                        <div 
                          key={index2} 
                          className="w-full m-3 justify-center bg-white h-[200px] md:h-[400px] border rounded-lg shadow-lg"
                        >
                          <BarChart 
                            labels={item.data[0].list} 
                            values={subItem.list} 
                            height="100%" width="95%" 
                            xAxisTitle={item.data[0].title} 
                            yAxisTitle={subItem.title}
                          />
                      </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            : null    
        ))
        }


    </div>
  )
}

export default AnalysisSummaryCharts