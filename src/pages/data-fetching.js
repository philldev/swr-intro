import { usePokemons } from '../hooks/usePokemon'

const DataFetching = () => {
	const { data } = usePokemons()
	const isLoading = data === undefined
	const pokemons = data?.results

	console.log('render DataFetching', data)

	return (
		<div className='w-full h-full p-4'>
			<h1 className='text-4xl font-bold'>Data Fetching</h1>
		</div>
	)
}
export default DataFetching
