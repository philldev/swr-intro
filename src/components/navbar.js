import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
	const comparison = [
		{
			name: 'Sharing state',
			pathId: 'global-state',
		},
		{
			name: 'Race Condition',
			pathId: 'race-condition',
		},
		{
			name: 'Caching',
			pathId: 'caching',
		},
		{
			name: 'Performance',
			pathId: 'performance',
		},
	]
	const examples = [
		{
			name: 'Data Fetching',
			pathId: 'data-fetching',
		},
		{
			name: 'Error Handling',
			pathId: 'error-handling',
		},
		{
			name: 'Pagination',
			pathId: 'pagination',
		},
		{
			name: 'Infinite Scrolling',
			pathId: 'infinite-scrolling',
		},
		{
			name: 'Mutation',
			pathId: 'mutation',
		},
		{
			name: 'Prefetching',
			pathId: 'prefetching',
		},
		{
			name: 'Suspense',
			pathId: 'suspense',
		},
	]

	const location = useLocation()

	const currentPathId = location.pathname.split('/')[3]

	return (
		<div className='w-full h-full p-4'>
			<div className='mb-4'>
				<Link to='/' className='text-2xl font-bold'>
					SWR Intro 🚀
				</Link>
			</div>
			<div className='flex flex-col space-y-2'>
				<span className='font-semibold'>Comparison</span>
				<div className='flex flex-col my-2 text-sm'>
					{comparison.map(({ name, pathId }) => (
						<Link
							key={'/demo/comparison/' + pathId}
							to={'/demo/comparison/' + pathId}
							className={clsx(
								'px-2 py-2 rounded-md',
								currentPathId === pathId && 'bg-slate-200'
							)}
						>
							{name}
						</Link>
					))}
				</div>
				<span className='font-semibold'>Examples</span>
				<div className='flex flex-col my-2 text-sm'>
					{examples.map(({ name, pathId }) => (
						<Link
							key={'/demo/examples/' + pathId}
							to={'/demo/examples/' + pathId}
							className={clsx(
								'px-2 py-2 rounded-md',
								currentPathId === pathId && 'bg-slate-200'
							)}
						>
							{name}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default Navbar
