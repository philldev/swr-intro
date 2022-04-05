import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { fetcher } from '../helpers/api'
import { usePokemon } from '../hooks/usePokemon'
import { usePokemons } from '../hooks/usePokemons'

const CachingPage = () => {
	return (
		<div className='w-full h-full p-4'>
			<h1 className='mb-4 text-4xl font-bold'>Caching</h1>
			<div className='flex mb-4 border'>
				<WithSWR />
				<BasicDataFetching />
			</div>
			<div className='text-sm text-yellow-600'>
				Slow the network throttle to see the difference!
			</div>
		</div>
	)
}

const WithSWR = () => {
	const [selectedPokemon, setSelectedPokemon] = useState(null)
	const { data } = usePokemons({ query: '?limit=3' })
	const isLoading = data === undefined

	return (
		<div className='flex-1 p-4 bg-slate-50'>
			<h2 className='mb-4 text-2xl font-bold'>With SWR</h2>
			<div className='flex space-x-4'>
				<div className='flex flex-col space-y-2'>
					{isLoading && <div>Loading...</div>}
					{data?.results?.map((pokemon) => (
						<button
							onClick={() => setSelectedPokemon(pokemon.name)}
							className={clsx(
								'px-2 py-1 text-sm font-bold border',
								pokemon.name === selectedPokemon && 'bg-slate-900 text-white'
							)}
							key={pokemon.name}
						>
							{pokemon.name}
						</button>
					))}
				</div>
				{!selectedPokemon && <div>Select a pokemon</div>}
				{selectedPokemon && <PokemonSWR name={selectedPokemon} />}
			</div>
		</div>
	)
}

const PokemonSWR = ({ name }) => {
	const { data } = usePokemon(name)
	const isLoading = data === undefined
	if (isLoading) return <div>Loading...</div>
	return (
		<div className='flex flex-1 border h-max'>
			<img src={data.sprites.front_default} className='' alt={name} />
			<div className='p-2'>
				<div className='font-bold'>{name}</div>
			</div>
		</div>
	)
}

const BasicDataFetching = () => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [selectedPokemon, setSelectedPokemon] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const res = await fetcher('/pokemon?limit=3')
			setData(res)
			setIsLoading(false)
		}
		fetchData()
	}, [])

	return (
		<div className='flex-1 p-4 bg-slate-50'>
			<h2 className='mb-4 text-2xl font-bold'>Basic Data Fetching</h2>
			<div className='flex space-x-4'>
				<div className='flex flex-col space-y-2'>
					{isLoading && <div>Loading...</div>}
					{data?.results?.map((pokemon) => (
						<button
							onClick={() => setSelectedPokemon(pokemon.name)}
							className={clsx(
								'px-2 py-1 text-sm font-bold border',
								pokemon.name === selectedPokemon && 'bg-slate-900 text-white'
							)}
							key={pokemon.name}
						>
							{pokemon.name}
						</button>
					))}
				</div>
				{!selectedPokemon && <div>Select a pokemon</div>}
				{selectedPokemon && <PokemonBasicFetching name={selectedPokemon} />}
			</div>
		</div>
	)
}

const PokemonBasicFetching = ({ name }) => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const res = await fetcher(`/pokemon/${name}`)
			setData(res)
			setIsLoading(false)
		}
		fetchData()
	}, [name])

	if (isLoading) return <div>Loading...</div>
	return (
		<div className='flex flex-1 border h-max'>
			<img src={data.sprites.front_default} className='' alt={name} />
			<div className='p-2'>
				<div className='font-bold'>{name}</div>
			</div>
		</div>
	)
}

export default CachingPage
