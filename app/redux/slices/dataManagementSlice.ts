import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { Object } from '@/app/types';

// Define the shape of the initial state
export interface DataManagementState {
  apis: Object[]; 
  modules: Object[]; 
  module: Object[]; 
  allDataSources: Object[]; 
  files: Object[]; 
  databases: Object[]; 
  showUploadDocumentsForm: boolean
  showConnectApiForm: boolean;
  showConnectDatabaseForm: boolean;
}

// Initial state
const initialState: DataManagementState = {
  apis: [],
  modules: [],
  module: [],
  allDataSources: [],
  files: [],
  databases: [],
  showUploadDocumentsForm: false,
  showConnectApiForm: false,
  showConnectDatabaseForm: false,
};

export const dataManagementSlice = createSlice({
  name: 'data_management',
  initialState,
  reducers: {
    setAllDataSources: (state, action: PayloadAction<any[]>) => { // Replace 'any' with the specific type if known
      state.allDataSources = action.payload;
    },
    setFiles: (state, action: PayloadAction<any[]>) => { // Replace 'any' with the specific type if known
      state.files = action.payload;
    },
    setDatabases: (state, action: PayloadAction<any[]>) => { // Replace 'any' with the specific type if known
      state.databases = action.payload;
    },
    setApis: (state, action: PayloadAction<any[]>) => { // Replace 'any' with the specific type if known
      state.apis = action.payload;
    },
    setModules: (state, action: PayloadAction<any[]>) => { // Replace 'any' with the specific type if known
      state.modules = action.payload;
    },
    setModule: (state, action: PayloadAction<any[]>) => { // Replace 'any' with the specific type if known
      state.module = action.payload;
    },
    setShowUploadDocumentsForm: (state, action: PayloadAction<boolean>) => {
      state.showUploadDocumentsForm = action.payload;
    },
    setShowConnectApiForm: (state, action: PayloadAction<boolean>) => {
      state.showConnectApiForm = action.payload;
    },
    setShowConnectDatabaseForm: (state, action: PayloadAction<boolean>) => {
      state.showConnectDatabaseForm = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setAllDataSources,
  setFiles,
  setDatabases,
  setApis,
  setModules,
  setModule,
  setShowUploadDocumentsForm,
  setShowConnectApiForm,
  setShowConnectDatabaseForm,
} = dataManagementSlice.actions;

export const clearStorage = () => ({ type: PURGE, key: 'data_management', result: () => null });

export default dataManagementSlice.reducer;
