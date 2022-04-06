import { usePokemons } from '../hooks/usePokemons'

const PokemonList = () => {
	const { data } = usePokemons({ query: '?limit=10' })
	const isLoading = data === undefined
	return (
		<div className='grid grid-cols-3 gap-4'>
			{isLoading ? (
				<div className='text-center'>Loading...</div>
			) : (
				data.results.map((pokemon, index) => (
					<PokemonCard key={index} pokemon={pokemon} />
				))
			)}
		</div>
	)
}

const PokemonCard = ({ pokemon }) => {
	return (
		<div className='font-bold border rounded'>
			<p className='p-2 text-center'>{pokemon.name}</p>
		</div>
	)
}

export default PokemonList
