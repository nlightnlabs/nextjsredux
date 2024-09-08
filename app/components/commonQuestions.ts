import * as nlightnApi from '../apis/nlightn'

const checkInventory = async ()=>{
    const requestPayload = {
        appName: "inventory_analysis",
        arguments: {"data1":0, "data2":100}
      };
    const response:any = await nlightnApi.pythonApp(requestPayload)
    const output =response.data
    return output
}


const trackSales = async ()=>{
    const requestPayload = {
        appName: "inventory_analysis",
        arguments: {"data1":0, "data2":100}
      };
    const response:any = await nlightnApi.pythonApp(requestPayload)
    const output =response.data
    return output
}

const trackSpending = async ()=>{

    const requestPayload = {
        appName: "inventory_analysis",
        arguments: {"data1":0, "data2":100}
      };
    const response:any = await nlightnApi.pythonApp(requestPayload)
    const output =response.data
    return output
}

const checkBudget = async ()=>{
    const requestPayload = {
        appName: "inventory_analysis",
        arguments: {"data1":0, "data2":100}
      };
    const response:any = await nlightnApi.pythonApp(requestPayload)
    const output =response.data
    return output
}

const payInvoices = async ()=>{
  const requestPayload = {
      appName: "supplier_invoices",
      arguments: {"data1":0, "data2":100}
    };
  const response:any = await nlightnApi.pythonApp(requestPayload)
  const output =response.data
  return output
}

const purchaseSomething = async ()=>{
  return "purchase_orders"
}

const commonFunctions:any = async()=>{
  const response:any = await nlightnApi.getTable("common_functions")
  const commonFunctions = response.data
  console.log(commonFunctions)
  return commonFunctions
}
commonFunctions()


export const commonTasks:any[] = [
    {id: 1, name: "track_sales", label: "Track Sales", prompts: [], action: trackSales},
    {id: 2, name: "check_inventory", label: "Check Inventory", prompts: [], action: checkInventory},
    {id: 3, name: "purchase_something", label: "Purchase Something", prompts: [], action: purchaseSomething},
    {id: 4, name: "pay_invoices", label: "Pay Invoices", prompts: [], action: payInvoices},
    {id: 5, name: "track_spending", label: "Track Spending", prompts: [], action: trackSpending},
    {id: 6, name: "check_budget", label: "Check Budget", prompts: [], action: checkBudget},
]