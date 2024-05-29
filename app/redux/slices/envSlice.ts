import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

// Define the shape of the initial state
export interface EnvironmentState {
  appName: string;
  dbName: string;
  fileStorageBucket: string;
  logoFile: string;
  theme: string;
}

// Initial state
const initialState: EnvironmentState = {
  appName: "",
  dbName: "",
  fileStorageBucket: "",
  logoFile: "",
  theme: ""
};

export const envSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    setAppName: (state, action: PayloadAction<string>) => {
      state.appName = action.payload;
    },
    setDbName: (state, action: PayloadAction<string>) => {
      state.dbName = action.payload;
    },
    setFileStorageBucket: (state, action: PayloadAction<string>) => {
      state.fileStorageBucket = action.payload;
    },
    setLogoFile: (state, action: PayloadAction<string>) => {
      state.logoFile = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAppName, setDbName, setFileStorageBucket, setLogoFile, setTheme } = envSlice.actions;

export const clearStorage = () => ({ type: PURGE, key: 'envStorage', result: () => null });

export default envSlice.reducer;


