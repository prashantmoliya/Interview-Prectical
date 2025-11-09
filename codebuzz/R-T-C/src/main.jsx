import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import store from './Redux/store.jsx';
import Store, { persistor } from './Redux-Toolkit/Store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import './Components/i18next/i18n.jsx';
import { DarkModeContextProvider } from './Components/Context-DarkMode/DarkModeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={Store}>
                <PersistGate loading={null} persistor={persistor}>

                    <DarkModeContextProvider >
                        <App />

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            closeOnClick
                            draggable
                            theme="colored"
                        />
                    </DarkModeContextProvider>

                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
