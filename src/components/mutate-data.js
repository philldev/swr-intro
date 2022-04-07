import useSWR from 'swr'
import { fetcher } from '../helpers/api'

export const MutateData = () => {
	const { data, mutate } = useSWR('/pokemon/4', fetcher)
	const isLoading = data === undefined

	const hp = data ? data.stats[0].base_stat : null
	const attack = data ? data.stats[1].base_stat : null

	const handleUpgradeHp = () => {
		const newData = {
			...data,
			stats: data.stats.map((stat) => {
				if (stat.stat.name === 'hp') {
					return {
						...stat,
						base_stat: stat.base_stat + 1,
					}
				}
				return stat
			}),
		}

		mutate(newData, { revalidate: false })
	}

	const handleUpgradeAttack = () => {
		const newData = {
			...data,
			stats: data.stats.map((stat) => {
				if (stat.stat.name === 'attack') {
					return {
						...stat,
						base_stat: stat.base_stat + 1,
					}
				}
				return stat
			}),
		}
		mutate(newData, { revalidate: false })
	}

	const handleReset = () => {
		mutate()
	}

	return (
		<div>
			<h2 className='mb-2 text-2xl font-bold'>Mutate Data</h2>
			<div className='mb-2 space-x-2'>
				<button
					onClick={handleUpgradeHp}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Upgrade hp +
				</button>
				<button
					onClick={handleUpgradeAttack}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Upgrade attack +
				</button>
				<button
					onClick={handleReset}
					className='px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
				>
					Reset
				</button>
			</div>
			<div className='border'>
				{isLoading ? (
					<div className='text-center'>Loading...</div>
				) : (
					<div className='flex'>
						<img src={data.sprites.front_default} alt='' />
						<div className='p-2 text-sm'>
							<div>
								<span>Name : </span>
								<span>{data.name}</span>
							</div>
							<div>
								<span>HP : </span>
								<span>{hp}</span>
							</div>
							<div>
								<span>Attack : </span>
								<span>{attack}</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
