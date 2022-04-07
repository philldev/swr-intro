import clsx from 'clsx'
import { useState } from 'react'
import useSWR, { mutate, useSWRConfig } from 'swr'
import { fetcher } from '../helpers/api'

const Prefetching = () => {
	const [id, setId] = useState(null)
	return (
		<div className='w-full h-full p-4'>
			<h1 className='mb-4 text-4xl font-bold'>Prefetching</h1>
			<p className='mb-4 text-orange-400'>
				Hover on the item to prefetch data!
			</p>
			<div className='mb-1'>Select Pokemon</div>
			<div className='flex space-x-4'>
				<PokemonList setId={setId} id={id} />
				<PokemonDetail id={id} />
			</div>
		</div>
	)
}

const PokemonList = ({ setId, id }) => {
	const { data } = useSWR('/pokemon?limit=10', fetcher)
	const isLoading = data === undefined

	if (isLoading) return <div className=''>Loading...</div>

	return (
		<div className='flex flex-col space-y-3 w-[150px]'>
			{data.results.map((pokemon, index) => {
				return (
					<button
						key={pokemon.name}
						className={clsx(
							pokemon.name === id && 'bg-slate-200',
							'px-2 py-2 border rounded text-left cursor-pointer hover:bg-slate-200'
						)}
						onMouseOver={async () => {
							// prefetching data
							console.log('prefetching data', pokemon.name)
							mutate(
								`/pokemon/${pokemon.name}`,
								fetcher('/pokemon/' + pokemon.name)
							)
						}}
						onClick={() => setId(pokemon.name)}
					>
						{pokemon.name}
					</button>
				)
			})}
		</div>
	)
}

const PokemonDetail = ({ id }) => {
	const { data, isValidating } = useSWR(id ? `/pokemon/${id}` : null, fetcher)
	const isLoading = data === undefined && isValidating

	if (id === null) return null

	if (isLoading) return <div className=''>Loading...</div>

	return (
		<div className='border h-max'>
			<img
				className='w-60'
				src={data?.sprites.front_default}
				alt={data?.name}
			/>
			<div className='p-4 text-xl font-bold text-center'>{data?.name}</div>
		</div>
	)
}

export default Prefetching
