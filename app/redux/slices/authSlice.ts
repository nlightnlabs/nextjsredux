import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';
import { Object } from '@/app/types';


// Define the shape of the initial state
export interface AuthState {
  user: Object; 
  userLoggedIn: boolean;
}

// Initial state
const initialState: AuthState = {
  user: {},
  userLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Record<string, any>>) => { // Adjust the type if you have a more specific user type
      state.user = action.payload;
    },
    setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.userLoggedIn = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserLoggedIn } = authSlice.actions;

export const clearStorage = () => ({ type: PURGE, key: 'authStorage', result: () => null });

export default authSlice.reducer;

