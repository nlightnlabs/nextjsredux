import { combineReducers, Reducer } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer, { AuthState } from './slices/authSlice';
import navReducer, { NavigationState } from './slices/navSlice';
import dataManagementReducer, { DataManagementState } from './slices/dataManagementSlice';
import appsReducer, { AppsState } from './slices/appsSlice';
import modelsReducer, { ModelsState } from './slices/modelsSlice';
import envReducer, { EnvironmentState } from './slices/envSlice';

import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';

// Define the persist config with type annotations
const persistConfig = {
  key: 'root', // Key for the storage
  storage, // Storage engine to use
  whitelist: ['authentication', 'navigation', 'data_management', 'models', 'apps', 'environment'], // Reducers to persist
};

// Combine reducers with RootState type
const rootReducer = combineReducers({
  authentication: authReducer,
  navigation: navReducer,
  data_management: dataManagementReducer,
  models: modelsReducer,
  apps: appsReducer,
  environment: envReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const clearAllStorage = () => ({
  type: 'persist/PURGE', // Use 'persist/PURGE' for redux-persist v6
  keys: ['authStorage', 'navStorage', 'data_management', 'models', 'apps','environment'], // Add keys for all your slices
  result: () => null,
});



