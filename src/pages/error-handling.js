import useSWR from 'swr'
import { PokemonCard } from '../components/pokemon-card'
import { fetcher } from '../helpers/api'

const ErrorHandlingPage = () => {
	const { data, isValidating, error, mutate } = useSWR('/pokemon', (key) => {
		if (Math.random() > 0.5) {
			throw new Error('Something went wrong')
		}
		return fetcher(key)
	})

	const isLoading = isValidating

	return (
		<div className='w-full h-full p-4'>
			<h1 className='mb-4 text-4xl font-bold'>Error Handling</h1>
			<div className='flex mb-4'>
				<button
					onClick={() => mutate()}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Refresh
				</button>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				{isLoading ? (
					<div className='text-center'>Loading...</div>
				) : error ? (
					<div className='text-red-500'>{error.message}</div>
				) : data ? (
					data.results.map((pokemon, index) => (
						<PokemonCard key={index} pokemon={pokemon} />
					))
				) : null}
			</div>
		</div>
	)
}
export default ErrorHandlingPage
