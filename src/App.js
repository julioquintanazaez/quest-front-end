import './App.css';
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from './context/Context';
import { ProtectedRoute } from './context/ProtectedRoute';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Admin from './pages/Admin.js';
import Quest_One from './pages/Quest_One.js';


const App = () => {	
	
	const { isLoggedIn, isAdmin } = useContext(Context);
	
	return (
		<div>							
			<Routes>
				<Route index element={<Home />} />
				<Route path="/" element={<Home />} />	
				<Route path="/quest_one" element={<Quest_One />} />	
				<Route path="/login" element={<Login />} />	
				<Route element={<ProtectedRoute isAllowed={ isLoggedIn && isAdmin } />}>
					<Route path="/admin" element={<Admin />} />
				</Route>				
				<Route path="*" element={<p>There's nothing here: 404!</p>} />
			</Routes>						
		</div>
	);
}

export default App;