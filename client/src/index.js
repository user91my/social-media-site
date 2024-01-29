import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// key - String that serves as the key for storing persisted state in the storage
// storage - Specifies where the state should be stored.
//           'redux-persist/lib/storage' uses the default web storage (localStorage in most cases).
// version - Represents the version of the persisted state.
const persistConfig = { key: "root", storage, version: 1 };
// 'persistReducer' is used to wrap 'authReducer' to ensure 'redux-persist' works correctly.
// It enhances the persistence logic of 'authReducer'.
const persistedReducer = persistReducer(persistConfig, authReducer);
// configureStore - A function from '@reduxjs/toolkit' that helps to create a Redux store.
// reducer - Set to 'persistedReducer'.
// middleware - Using 'getDefaultMiddleware' starts us off with a set of pre-configured
//              middleware provided by '@reduxjs/toolkit' that can be customized.
// serializableCheck - A number of actions are 'ignoredActions' during serialization as they are
//                     part of Redux Persist's internal management and are NOT meant to be serialized
//                     as regular application actions.
//                     Serialization is a process of converting a complex data structure (e.g. javascript
//                     object / state) into a format that can be easily stored (e.g. in localStorage),
//                     transmitted or reconstructed later.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 'loading' - a that prop specifies what should be displayed while rehydration is in process. */}
      {/*             Setting to 'null means that nothing will rendered during loading process.    */}
      {/* 'persistor' - 'persistStore' will manage the actual persistence of the Redux store. */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
