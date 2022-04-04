import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
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
				<Link to='/demo/examples' className='font-semibold'>
					Comparison
				</Link>
				<span className='font-semibold'>Examples</span>
				<div className='flex flex-col pl-2 my-2 text-sm'>
					{examples.map(({ name, pathId }) => (
						<Link
							key={'/demo/examples/' + pathId}
							to={'/demo/examples/' + pathId}
							className={clsx(
								'px-2 py-2 rounded-md',
								currentPathId === pathId && 'bg-slate-900 text-white'
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
