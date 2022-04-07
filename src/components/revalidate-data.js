import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '../helpers/api'

export const RevalidateData = () => {
	const { mutate } = useSWRConfig()

	const handleRefreshAlldata = () => {
		mutate('/pokemon/1')
		mutate('/pokemon/2')
		mutate('/pokemon/3')
	}

	const handleReset = () => {
		mutate('/pokemon/1', undefined, { revalidate: false })
		mutate('/pokemon/2', undefined, { revalidate: false })
		mutate('/pokemon/3', undefined, { revalidate: false })
	}
	const revalidate = (id) => {
		mutate('/pokemon/' + id)
	}

	return (
		<div>
			<h2 className='mb-2 text-2xl font-bold'>Revalidate / Refresh Data</h2>
			<div className='mb-2 space-x-2'>
				<button
					onClick={handleRefreshAlldata}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Revalidate all data
				</button>
				<button
					onClick={handleReset}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Reset
				</button>
			</div>

			<div className='space-x-4'>
				<button
					onClick={() => revalidate(1)}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Revalidate 1
				</button>
				<button
					onClick={() => revalidate(2)}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Revalidate 2
				</button>
				<button
					onClick={() => revalidate(3)}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Revalidate 3
				</button>
			</div>
			<div className='grid grid-cols-3 gap-4 py-4'>
				<Pokemon id={1} />
				<Pokemon id={2} />
				<Pokemon id={3} />
			</div>
		</div>
	)
}

const Pokemon = ({ id }) => {
	const { data, isValidating } = useSWR('/pokemon/' + id, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateOnMount: false,
	})

	const isLoading = data === undefined && isValidating

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data === undefined)
		return (
			<div>
				<p>no data</p>
			</div>
		)

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
