import { PokemonCard } from '../components/pokemon-card'
import { usePokemons } from '../hooks/usePokemons'

const DataFetching = () => {
	const { data } = usePokemons({ query: '?limit=10' })
	const isLoading = data === undefined

	return (
		<div className='w-full h-full p-4'>
			<h1 className='mb-4 text-4xl font-bold'>Data Fetching</h1>
			<div className='grid grid-cols-3 gap-4'>
				{isLoading ? (
					<div className='text-center'>Loading...</div>
				) : (
					data.results.map((pokemon, index) => (
						<PokemonCard key={index} pokemon={pokemon} />
					))
				)}
			</div>
		</div>
	)
}
export default DataFetching
