import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';
import { Object } from '@/app/types';


export interface AppsState {
  allAppsModule: boolean;
  selectedApp: Object; 
  selectedAppName: string;
}

// Initial state
const initialState: AppsState = {
  allAppsModule: true,
  selectedApp: {},
  selectedAppName: "",
};

export const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setAllAppsModule: (state, action: PayloadAction<boolean>) => {
      state.allAppsModule = action.payload;
    },
    setSelectedApp: (state, action: PayloadAction<Object>) => { 
      state.selectedApp = action.payload;
    },
    setSelectedAppName: (state, action: PayloadAction<string>) => { 
      state.selectedAppName = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllAppsModule, setSelectedApp, setSelectedAppName } = appsSlice.actions;

export const clearStorage = () => ({ type: PURGE, key: 'apps', result: () => null });

export default appsSlice.reducer;
