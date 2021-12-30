import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainPageView from "./view/MainPageView"

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<MainPageView />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
