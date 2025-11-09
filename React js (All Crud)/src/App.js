import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './Prectice/Login-Register/Layout';
import Login from './Prectice/Login-Register/Login';
import Register from './Prectice/Login-Register/Register';
import ForgotPassword from './Prectice/Login-Register/ForgotPassword';
import Otp from './Prectice/Login-Register/Otp';
import NewPassword from './Prectice/Login-Register/NewPassword';

import DefaultLayout from './Prectice/Layout/Layout';
import AddCrud from './Prectice/Crud/AddCrud';
import ViewCrud from './Prectice/Crud/ViewCrud';
import UpdateCrud from './Prectice/Crud/UpdateCrud';
import AxiosAddCrud from './Prectice/AxiosCrud/AddCrud';
import AxiosViewCrud from './Prectice/AxiosCrud/ViewCrud';
import AxiosUpdateCrud from './Prectice/AxiosCrud/UpdateCrud';
import FirebaseAddCrud from './Prectice/FirebaseCrud/AddCrud';
import FirebaseViewCrud from './Prectice/FirebaseCrud/ViewCrud';
import FirebaseUpdateCrud from './Prectice/FirebaseCrud/UpdateCrud';
// import Redux from './Prectice/Component';
// import ReduxAddCrud from './Prectice/ReduxCrud/AddCrud';
// import ReduxViewCrud from './Prectice/ReduxCrud/ViewCrud';
// import ReduxUpdateCrud from './Prectice/ReduxCrud/UpdateCrud';
import ReduxAxiosAddCrud from './Prectice/ReduxAxiosCrud/AddCrud';
import ReduxAxiosViewCrud from './Prectice/ReduxAxiosCrud/ViewCrud';
import ReduxAxiosUpdateCrud from './Prectice/ReduxAxiosCrud/UpdateCrud';

function App() {


    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path='/' element={<Login />} />
                        <Route path='/Register' element={<Register />} />
                        <Route path='/ForgotPassword' element={<ForgotPassword />} />
                        <Route path='/Otp' element={<Otp />} />
                        <Route path='/NewPassword' element={<NewPassword />} />
                    </Route>

                    <Route element={<DefaultLayout />}>
                        {/* LocalStorage */}
                        <Route path='/ViewCrud' element={<ViewCrud />} />
                        <Route path='/AddCrud' element={<AddCrud />} />
                        <Route path='/UpdateCrud/:id' element={<UpdateCrud />} />
                        {/* Axios */}
                        <Route path='/Axios/AddCrud' element={<AxiosAddCrud />} />
                        <Route path='/Axios/ViewCrud' element={<AxiosViewCrud />} />
                        <Route path='/Axios/UpdateCrud/:id' element={<AxiosUpdateCrud />} />
                        {/* Firebase */}
                        <Route path='/Firebase/AddCrud' element={<FirebaseAddCrud />} />
                        <Route path='/Firebase/ViewCrud' element={<FirebaseViewCrud />} />
                        <Route path='/Firebase/UpdateCrud/:id' element={<FirebaseUpdateCrud />} />
                        {/* Redux -- (old redux likes // ActionType, Action, Reducer, RootReducer) */}
                        {/**<Route path='/Redux' element={<Redux />} />
                        <Route path='/Redux/AddCrud' element={<ReduxAddCrud />} />
                        <Route path='/Redux/ViewCrud' element={<ReduxViewCrud />} />
                        <Route path='/Redux/UpdateCrud' element={<ReduxUpdateCrud />} />**/}
                        {/* Redux with Axios API -- (old redux likes // ActionType, Action, AxiosApi, Reducer, RootReducer) */}
                        <Route path='/ReduxAxios/AddCrud' element={<ReduxAxiosAddCrud />} />
                        <Route path='/ReduxAxios/ViewCrud' element={<ReduxAxiosViewCrud />} />
                        <Route path='/ReduxAxios/UpdateCrud' element={<ReduxAxiosUpdateCrud />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
