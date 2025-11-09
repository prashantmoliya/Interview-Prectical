import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import ThemeProvider from './context/ThemeContext.jsx'
import CurrencyProvider from './context/CurrencyContext.jsx'
import FirebaseAuthProvider from './context/FirebaseAuthContext.jsx'

import { Provider } from 'react-redux'
import store from './redux-Toolkit/store.jsx'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>

        <Provider store={store}>
            <ThemeProvider>
                <CurrencyProvider>
                    <FirebaseAuthProvider>
                        <App />
                    </FirebaseAuthProvider>
                </CurrencyProvider>
            </ThemeProvider>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                theme="colored"
            />
        </Provider>

    </BrowserRouter>
)
