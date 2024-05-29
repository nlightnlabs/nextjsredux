import { PrismaClient } from "@prisma/client"
import axios from "axios";
import * as formatValue from '../functions/formatValue'
export const baseURL = process.env.NODE_ENV==="production" ? "https://nlightnlabs.net" : "http://localhost:3001"
export const serverConnection = axios.create({
  baseURL,
})

import { Object, ObjectArray } from "../types.js"

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ??
new PrismaClient({
    log: ["query"],
})

// Get all records in a table
export async function getTable(tableName: string) {
      const data = await ((prisma as any)[tableName]).findMany();
      return data;
  }


  // Add a new record
export async function addRecord(tableName: string, data: Object){
    const result = await ((prisma as any)[tableName]).create({data});
    return result;
}

//   Delete a record
export async function deleteRecord(tableName: string, recordId: number){
    const result = await ((prisma as any)[tableName]).delete({
        where: {id: recordId}
    });
    return result;
}


// Get list
export async function getList(tableName: string, fieldName: string) {
    const data = await ((prisma as any)[tableName]).findMany({
        select:{[fieldName]:true}
    });
    return data;
}

// Get a record
export async function getRecord(tableName: string, conditionalField: string, conditionalValue: any) {
    const response = await ((prisma as any)[tableName]).findFirst({
        where:{
            [conditionalField]:conditionalValue
        }
    });
    return response;
}

// Get a records
export async function getRecords(tableName: string, conditionalField: string, conditionalValue: any) {
    const response = await ((prisma as any)[tableName]).findMany({
        where:{
            [conditionalField]:conditionalValue
        }
    });
    return response;
}


// Get conditional list
export async function getConditionalList(tableName: string, lookupField: string, conditionalField: string, conditionalValue: any) {
    const response = await ((prisma as any)[tableName]).findMany({
        where:{
            [conditionalField]:conditionalValue
        },
        select:{
            [lookupField]:true,
        },
        distinct:[lookupField],
    });
    return response;
}


// Get conditional value
export async function getConditionalValue(tableName: string, lookupField: string, conditionalField: string, conditionalValue: any) {
    const response = await ((prisma as any)[tableName]).findFirst({
        where:{
            [conditionalField]:conditionalValue
        },
        select:{
            [lookupField]:true,
        },
        distinct:[lookupField],
    });
    return response;
}