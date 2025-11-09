import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

import { Provider } from 'react-redux';
import store from './redux-Toolkit/store.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />

            <ToastContainer
                position="top-center"
                autoClose={3000}
                closeOnClick
                draggable
                theme="colored"
            />
        </Provider>
    </BrowserRouter>
)
