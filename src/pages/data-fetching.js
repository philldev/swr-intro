import useSWR from 'swr'
import { PokemonCard } from '../components/pokemon-card'
import { fetcher } from '../helpers/api'

const DataFetching = () => {
	const query = '?limit=9'
	const { data } = useSWR('/pokemon' + query, fetcher)
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
