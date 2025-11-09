import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './cm/Layout/Layout';
import Login from './cm/Layout/Login';
import Register from './cm/Layout/Register';
import DeLayout from './cm/DeLayout/DeLayout';
import Dashboard from './cm/Pages/Dashboard';
import Profile from './cm/Pages/Profile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logingetuser, registergetdata } from './cm/Redux/AuthLayout/AxiosApi';
import View from './cm/Pages/View';
import Add from './cm/Pages/Add';
import Update from './cm/Pages/Update';

function App() {

    const dispatch= useDispatch();

    useEffect(() => {
        dispatch(registergetdata());

        dispatch(logingetuser());
    }, [dispatch]);

    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='/' element={<Login />} />
                        <Route path='/Register' element={<Register />} />
                    </Route>

                    <Route element={<DeLayout />}>
                        <Route path='/DashBoard' element={<Dashboard />} />
                        <Route path='/Profile' element={<Profile />} />
                        <Route path='/User' element={<View />} />
                        <Route path='/Add' element={<Add />} />
                        <Route path='/Edit' element={<Update />} />
                    </Route>
                </Routes>
            </BrowserRouter>            
      
        </div>
    );
}

export default App;
