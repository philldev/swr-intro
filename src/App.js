import { Route, Routes } from 'react-router-dom'
import DataFetching from './pages/data-fetching'
import Examples from './pages/examples'
import Home from './pages/home'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/examples' element={<Examples />}>
				<Route path='data-fetching' element={<DataFetching />} />
			</Route>
		</Routes>
	)
}

export default App
