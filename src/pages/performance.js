import { useEffect, useState } from 'react'
import { mutate } from 'swr'
import { fetcher } from '../helpers/api'
import { usePokemon } from '../hooks/usePokemon'

const PerformancePage = () => {
	const [currentView1, setCurrentView1] = useState('basic-data-fetching')
	const [currentView2, setCurrentView2] = useState('basic-data-fetching')

	const views = [
		{
			name: 'basic-data-fetching',
			btn: 'Basic Data Fetching',
		},
		{
			name: 'with-swr',
			btn: 'With SWR',
		},
	]
	return (
		<div className='w-full h-full p-4 space-y-4'>
			<h1 className='mb-4 text-4xl font-bold'>Performance</h1>
			<div>
				<h2 className='mb-2 text-xl font-bold'>Unnecessary Requests</h2>
				<div className='flex mb-4 space-x-4'>
					{views.map((view) => (
						<button
							key={view.name}
							className={`${
								currentView1 === view.name
									? 'bg-gray-900 text-white'
									: 'bg-gray-200'
							} px-2 py-2 text-sm font-bold rounded-md`}
							onClick={() => setCurrentView1(view.name)}
						>
							{view.btn}
						</button>
					))}
				</div>
				<div className='border'>
					{currentView1 === 'with-swr' && <WithSWRRequest />}
					{currentView1 === 'basic-data-fetching' && (
						<BasicDataFetchingRequest />
					)}
				</div>
			</div>
			<div>
				<h2 className='mb-2 text-xl font-bold'>Unnecessary Rerender</h2>
				<div className='flex mb-4 space-x-4'>
					{views.map((view) => (
						<button
							key={view.name}
							className={`${
								currentView2 === view.name
									? 'bg-gray-900 text-white'
									: 'bg-gray-200'
							} px-2 py-2 text-sm font-bold rounded-md`}
							onClick={() => setCurrentView2(view.name)}
						>
							{view.btn}
						</button>
					))}
				</div>
				<div className='border'>
					{currentView2 === 'with-swr' && <RerenderCompSWR />}
					{currentView2 === 'basic-data-fetching' && <RerenderComp />}
				</div>
			</div>
		</div>
	)
}

const WithSWRRequest = () => {
	return (
		<div className='grid grid-cols-4 gap-2 p-4'>
			<PokemonSWR />
			<PokemonSWR />
			<PokemonSWR />
			<PokemonSWR />
		</div>
	)
}

const BasicDataFetchingRequest = () => {
	return (
		<div className='grid grid-cols-4 gap-2 p-4'>
			<Pokemon />
			<Pokemon />
			<Pokemon />
			<Pokemon />
		</div>
	)
}

const PokemonSWR = () => {
	const { data } = usePokemon(1)
	const isLoading = data === undefined

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='font-bold border rounded'>
			<img
				className='w-full'
				src={data.sprites.front_default}
				alt={data.name}
			/>
			<h1 className='p-2 text-center'>{data.name}</h1>
		</div>
	)
}

const Pokemon = () => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const response = await fetcher('/pokemon/1')
			setData(response)
			setIsLoading(false)
		}

		fetchData()
	}, [])

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='font-bold border rounded'>
			<img
				className='w-full'
				src={data.sprites.front_default}
				alt={data.name}
			/>
			<h1 className='p-2 text-center'>{data.name}</h1>
		</div>
	)
}

const RerenderCompSWR = () => {
	const fetchData = () => {
		mutate('/pokemon/1')
	}

	return (
		<div className='p-4'>
			<div className='flex mb-4 space-x-2'>
				<button
					onClick={fetchData}
					className='px-2 py-1 text-white rounded-md bg-slate-600'
				>
					Fetch!
				</button>
				<button
					onClick={() => mutate('/pokemon/1', undefined, { revalidate: false })}
					className='px-2 py-1 text-white rounded-md bg-slate-600'
				>
					Reset!
				</button>
			</div>
			<div className='grid grid-cols-3 gap-2'>
				<PokemonViewSWR />
				<HeavyComp />
				<PokemonViewSWR />
			</div>
		</div>
	)
}

const RerenderComp = () => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = async () => {
		setIsLoading(true)
		const response = await fetcher('/pokemon/1')
		setData(response)
		setIsLoading(false)
	}

	return (
		<div className='p-4'>
			<div className='flex mb-4 space-x-2'>
				<button
					onClick={fetchData}
					className='px-2 py-1 text-white rounded-md bg-slate-600'
				>
					Fetch!
				</button>
				<button
					onClick={() => setData(null)}
					className='px-2 py-1 text-white rounded-md bg-slate-600'
				>
					Reset!
				</button>
			</div>
			<div className='grid grid-cols-3 gap-2'>
				<PokemonView pokemon={data} />
				<HeavyComp />
				<PokemonView pokemon={data} />
			</div>
		</div>
	)
}

const HeavyComp = () => {
	let num = 0

	for (let index = 0; index < 100000; index++) {
		num += index
	}

	console.log(num)

	return (
		<div className='flex items-center justify-center py-2 font-bold text-red-600 border'>
			Heave Component!
		</div>
	)
}

const PokemonView = ({ pokemon }) => {
	if (!pokemon) return <div className='text-center'>No Data!</div>
	return (
		<div className='font-bold border rounded'>
			<img
				className='w-full'
				src={pokemon.sprites.front_default}
				alt={pokemon.name}
			/>
			<h1 className='p-2 text-center'>{pokemon.name}</h1>
		</div>
	)
}

const PokemonViewSWR = () => {
	const { data } = usePokemon(1, {
		revalidateOnMount: false,
		revalidateOnFocus: false,
	})

	if (!data) return <div className='text-center'>No Data!</div>
	return (
		<div className='font-bold border rounded'>
			<img
				className='w-full'
				src={data.sprites.front_default}
				alt={data.name}
			/>
			<h1 className='p-2 text-center'>{data.name}</h1>
		</div>
	)
}

export default PerformancePage
