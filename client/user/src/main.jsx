import React from 'react'
import ReactDOM from 'react-dom/client'
 import './index.css'
import { Provider } from 'react-redux'
import {store, persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import router from "./router"
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="bottom-center" duration={500} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
