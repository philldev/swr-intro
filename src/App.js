import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import DataFetching from './pages/data-fetching'
import Home from './pages/home'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route
				path='/examples'
				element={
					<div className='min-h-screen overflow-x-hidden bg-slate-50'>
						<div className='w-[250px] fixed h-full bottom-0 left-0 top-0'>
							<Navbar />
						</div>
						<div className='fixed w-full left-[250px] h-full right-0 top-0 bottom-0'>
							<Routes>
								<Route path='data-fetching' element={<DataFetching />} />
							</Routes>
						</div>
					</div>
				}
			/>
		</Routes>
	)
}

export default App
