import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

// Define the shape of the initial state
export interface ModelsState {
  selectedModel: string;
  models: string[];
}

// Initial state
const initialState: ModelsState = {
  selectedModel: "",
  models: [],
};

export const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    setSelectedModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload;
    },
    setModels: (state, action: PayloadAction<string[]>) => {
      state.models = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedModel, setModels } = modelsSlice.actions;

export const clearStorage = () => ({ type: PURGE, key: 'models', result: () => null });

export default modelsSlice.reducer;
