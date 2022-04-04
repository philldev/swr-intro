import { Route, Routes } from 'react-router-dom'
import DataFetching from './pages/data-fetching'
import ErrorHandling from './pages/error-handling'
import Examples from './pages/examples'
import Home from './pages/home'
import InfiniteScrolling from './pages/infinite-scrolling'
import Mutation from './pages/mutation'
import Pagination from './pages/pagination'
import SuspenseDemo from './pages/suspense'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='demo' element={<Examples />}>
				<Route path='examples/data-fetching' element={<DataFetching />} />
				<Route path='examples/error-handling' element={<ErrorHandling />} />
				<Route path='examples/pagination' element={<Pagination />} />
				<Route
					path='examples/infinite-scrolling'
					element={<InfiniteScrolling />}
				/>
				<Route path='examples/mutation' element={<Mutation />} />
				<Route path='examples/prefetching' element={<SuspenseDemo />} />
			</Route>
		</Routes>
	)
}

export default App
