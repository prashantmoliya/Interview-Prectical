import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import DefaultLayout from './Components/DefaultLayout/DefaultLayout'
import ViewUser from './Components/Home/ViewUser'
import AddUser from './Components/Home/AddUser'
import UpdateUser from './Components/Home/UpdateUser'
import Task from './Components/CartPrices/Task'
import ChartJs from './Components/Chart-Js/ChartJs'
import FancyApp from './Components/Fancy-App/FancyApp'
import Gsap from './Components/GSAP/Gsap'
import I18next from './Components/i18next/I18next'
import Profile from './Components/Profile/Profile'
import Product from './Components/Product/Product'

function App() {

    // console.log("User Api Url++", import.meta.env.VITE_APP_USER_API);

    // console.log("Context :- ", context);



    return (
        <>

            <Routes>    
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<DefaultLayout />}>
                    <Route path='/' element={<ChartJs />} />

                    <Route path='/profile' element={<Profile />} />

                    <Route path='/user' element={<ViewUser />} />
                    <Route path='/add-user' element={<AddUser />} />
                    <Route path='/update-user/:id' element={<UpdateUser />} />

                    <Route path='/cart' element={<Task />} />

                    <Route path='/gsap' element={<Gsap />} />

                    <Route path='/fancy-ui' element={<FancyApp />} />

                    <Route path='/i18next' element={<I18next />} />

                    <Route path='/product' element={<Product />} />
                </Route>
            </Routes>

        </>
    )
}

export default App;

