import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

// Define the shape of the initial state
export interface NavigationState {
  currentPage: string;
  pageList: string[];
  menuItems: string[];
}

// Initial state
const initialState: NavigationState = {
  currentPage: "Home",
  pageList: [],
  menuItems: [],
};

export const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setPageList: (state, action: PayloadAction<string[]>) => {
      state.pageList = action.payload;
    },
    setMenuItems: (state, action: PayloadAction<string[]>) => {
      state.menuItems = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentPage, setPageList, setMenuItems } = navSlice.actions;

export const clearStorage = () => ({ type: PURGE, key: 'navStorage', result: () => null });

export default navSlice.reducer;
