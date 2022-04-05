import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { fetcher } from '../helpers/api'
import { usePokemon } from '../hooks/usePokemon'

const RaceConditionPage = () => {
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
			<h1 className='mb-4 text-4xl font-bold'>Race Condition</h1>
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
	const [id, setId] = useState(1)
	return (
		<div className='flex p-4 space-x-4 bg-slate-50 w-max'>
			<div>
				<button
					className='px-2 py-1 mb-2 text-white rounded-md bg-slate-600'
					onClick={() => setId(Math.round(Math.random() * 20) + 1)}
				>
					fetch!
				</button>
				<p>fetching for id : {id}</p>
			</div>
			<div className='flex space-x-3'>
				<WithSWRA id={id} />
			</div>
		</div>
	)
}

const WithSWRA = ({ id }) => {
	const { data } = usePokemon(id)
	const isLoading = data === undefined
	if (isLoading) return <div>Loading...</div>

	return (
		<div className='flex border rounded-md'>
			<img
				src={data?.sprites.front_default}
				className='w-16 h-16'
				alt={data?.name}
			/>
			<div className='p-2'>
				<div className='font-semibold'>{data?.name}</div>
				<div
					className={clsx(
						id === parseInt(data?.id) ? 'text-green-600' : 'text-red-400',
						'text-sm'
					)}
				>
					displaying for id: {data?.id}
				</div>
			</div>
		</div>
	)
}

const BasicDataFetching = () => {
	const [id, setId] = useState(1)
	return (
		<div className='flex p-4 space-x-4 bg-slate-50 w-max'>
			<div>
				<button
					className='px-2 py-1 mb-2 text-white rounded-md bg-slate-600'
					onClick={() => setId(Math.round(Math.random() * 20) + 1)}
				>
					fetch!
				</button>
				<p>fetching for id : {id}</p>
			</div>
			<div className='flex space-x-3'>
				<BasicDataFetchingA id={id} />
			</div>
		</div>
	)
}

const BasicDataFetchingA = ({ id }) => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setTimeout(async () => {
				const result = await fetcher('/pokemon/' + id)
				setData(result)
				setIsLoading(false)
			}, Math.random() * 12000)
		}
		fetchData()
	}, [id])

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='flex border rounded-md'>
			<img
				src={data?.sprites.front_default}
				className='w-16 h-16'
				alt={data?.name}
			/>
			<div className='p-2'>
				<div className='font-semibold'>{data?.name}</div>
				<div
					className={clsx(
						id === parseInt(data?.id) ? 'text-green-600' : 'text-red-400',
						'text-sm'
					)}
				>
					displaying for id: {data?.id}
				</div>
			</div>
		</div>
	)
}

export default RaceConditionPage
