import { useEffect, useState } from 'react'
import { fetcher } from '../helpers/api'
import { usePokemon } from '../hooks/usePokemon'

const GlobalStatePage = () => {
	const [currentView, setCurrentView] = useState('basic-data-fetching')
	const views = [
		{
			name: 'basic-data-fetching',
			btn: 'Basic Data Fetching',
			component: BasicDataFetching,
		},
		{
			name: 'with-swr',
			btn: 'With SWR',
			component: WithSWR,
		},
	]
	return (
		<div className='w-full h-full p-4'>
			<h1 className='mb-4 text-4xl font-bold'>
				Sharing State Between Components
			</h1>
			<div>
				<div className='flex mb-4 space-x-4'>
					{views.map((view) => (
						<button
							key={view.name}
							className={`${
								currentView === view.name
									? 'bg-gray-900 text-white'
									: 'bg-gray-200'
							} px-2 py-2 text-sm font-bold rounded-md`}
							onClick={() => setCurrentView(view.name)}
						>
							{view.btn}
						</button>
					))}
				</div>
				<div className='border'>
					{currentView === 'with-swr' && <WithSWR />}
					{currentView === 'basic-data-fetching' && <BasicDataFetching />}
				</div>
			</div>
		</div>
	)
}

const WithSWR = () => {
	return (
		<div className='p-4 bg-slate-50'>
			<div className='mb-4'>Parent Component</div>
			<div className='flex space-x-3'>
				<WithSWRA />
				<WithSWRB />
				<WithSWRC />
			</div>
		</div>
	)
}

const WithSWRA = () => {
	const { data } = usePokemon(1)
	const isLoading = data === undefined

	return (
		<div className='flex-1 p-2 border rounded-lg bg-slate-50'>
			<div className='mb-2'>Component A</div>
			<div>{isLoading ? 'loading...' : data?.name}</div>
		</div>
	)
}
const WithSWRB = () => {
	const { data } = usePokemon(1)
	const isLoading = data === undefined

	return (
		<div className='flex-1 p-2 border rounded-lg bg-slate-50'>
			<div className='mb-2'>Component B</div>
			<div>{isLoading ? 'loading...' : data?.name}</div>
		</div>
	)
}
const WithSWRC = () => {
	const { data } = usePokemon(1)
	const isLoading = data === undefined

	return (
		<div className='flex-1 p-2 border rounded-lg bg-slate-50'>
			<div className='mb-2'>Component C</div>
			<div>{isLoading ? 'loading...' : data?.name}</div>
		</div>
	)
}

const BasicDataFetching = () => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			fetcher('/pokemon/1')
				.then((data) => {
					setData(data)
				})
				.catch((error) => {
					setError(error)
				})
				.finally(() => {
					setIsLoading(false)
				})
		}
		fetchData()
	}, [])

	return (
		<div className='p-4 bg-slate-50'>
			<div className='mb-4'>Parent Component</div>
			<div className='flex space-x-3'>
				<BasicDataFetchingA data={data} isLoading={isLoading} />
				<BasicDataFetchingB data={data} isLoading={isLoading} />
				<BasicDataFetchingC data={data} isLoading={isLoading} />
			</div>
		</div>
	)
}
const BasicDataFetchingA = ({ isLoading, data }) => {
	return (
		<div className='flex-1 p-2 border rounded-lg bg-slate-50'>
			<div className='mb-2'>Component A</div>
			<div>{isLoading ? 'loading...' : data?.name}</div>
		</div>
	)
}
const BasicDataFetchingB = ({ isLoading, data }) => {
	return (
		<div className='flex-1 p-2 border rounded-lg bg-slate-50'>
			<div className='mb-2'>Component B</div>
			<div>{isLoading ? 'loading...' : data?.name}</div>
		</div>
	)
}
const BasicDataFetchingC = ({ isLoading, data }) => {
	return (
		<div className='flex-1 p-2 border rounded-lg bg-slate-50'>
			<div className='mb-2'>Component C</div>
			<div>{isLoading ? 'loading...' : data?.name}</div>
		</div>
	)
}

export default GlobalStatePage
