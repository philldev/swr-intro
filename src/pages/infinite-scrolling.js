import { PokemonCard } from '../components/pokemon-card'
import { usePokemonsInfinite } from '../hooks/usePokemons'

const InfiniteScrolling = () => {
	const limit = 9
	const { data, mutate, setSize, size } = usePokemonsInfinite(limit)
	const isLoading = data === undefined

	const pokemons = data?.flat()

	return (
		<div className='w-full h-full p-4'>
			<h1 className='mb-4 text-4xl font-bold'>Infinite Scrolling</h1>
			<div className='flex mb-4 space-x-2'>
				<p>loaded {size * limit} items</p>
				<button
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
					onClick={() => setSize(0)}
				>
					Reset
				</button>
				<button
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
					onClick={() => setSize(size + 1)}
				>
					Load More
				</button>
			</div>
			<div className='grid grid-cols-1 gap-4'>
				{isLoading ? (
					<div className='text-center'>Loading...</div>
				) : (
					pokemons.map((pokemon, index) => (
						<PokemonCard key={index} pokemon={pokemon} />
					))
				)}
			</div>
		</div>
	)
}
export default InfiniteScrolling
