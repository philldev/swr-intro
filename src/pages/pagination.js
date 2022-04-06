import { useState } from 'react'
import { PokemonCard } from '../components/pokemon-card'
import { usePokemons } from '../hooks/usePokemons'

const Pagination = () => {
	const SIZE = 9
	const [page, setPage] = useState(0)
	const { data } = usePokemons({
		query: `?${page ? 'offset=' + SIZE * page : ''}&limit=${SIZE}`,
	})
	const isLoading = data === undefined

	console.log(data)
	return (
		<div className='w-full h-full p-4'>
			<h1 className='mb-4 text-4xl font-bold'>Pagination</h1>
			<div className='flex justify-between mb-4'>
				<button
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
					onClick={() => setPage(page - 1)}
					disabled={page === 0}
				>
					Prev
				</button>
				<div>Page : {page + 1}</div>
				<button
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
					onClick={() => setPage(page + 1)}
					disabled={isLoading}
				>
					Next
				</button>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				{isLoading ? (
					<div className='text-center'>Loading...</div>
				) : (
					data?.results?.map((pokemon, index) => (
						<PokemonCard key={index} pokemon={pokemon} />
					))
				)}
			</div>
		</div>
	)
}
export default Pagination
