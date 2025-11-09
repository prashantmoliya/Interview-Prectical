import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './Components/AuthLayout/AuthLayout';
import Login from './Components/Form/Login';
import Register from './Components/Form/Register';
import DefaultLayout from './Components/DefaultLayout/DefaultLayout';
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logingetuser, registergetdata } from './Components/Redux/Rest Api/AxiosApi';

function App() {

	const dispatch= useDispatch();

	useEffect(() => {
		dispatch(registergetdata())
				
		dispatch(logingetuser())		
	}, [])

	return (
		<div className="App">

			<BrowserRouter>
				<Routes>
					<Route element={<AuthLayout />}>
						<Route path='/' element={<Login />} />
						<Route path='/Register' element={<Register />} />
					</Route>

					<Route element={<DefaultLayout />}>
						<Route path='/Home' element={<Home />} />
						<Route path='/Profile' element={<Profile />} /> 
					</Route>
				</Routes>
			</BrowserRouter>

		</div>
	);
}

export default App;
