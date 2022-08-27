import './App.css';
import Write from './component/Write';
import Home from './component/Home';
import View from './component/View';
import React, { useState, useEffect } from 'react';

import {
	BrowserRouter as BrowserRouter,
	Switch,
	Route,
	Routes,
} from 'react-router-dom';
function App() {
	//글번호(key) = seq
	//글번호를 view로 넘기기위해 seq로 넘긴다.
	return (
		<div className="App">
			<BrowserRouter basename="{process.env.PUBIC_URL}">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/write/*" element={<Write />}></Route>
					<Route path="/view/:seq" element={<View />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
