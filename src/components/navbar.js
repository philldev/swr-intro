import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className='w-full h-full p-4'>
			<div className='mb-4'>
				<Link to='/' className='font-bold text-2xl'>
					SWR Intro 🚀
				</Link>
			</div>
			<div className='flex flex-col space-y-2'>
				<Link to='/examples' className='font-semibold'>
					Getting Started
				</Link>
				<span className='font-semibold'>Examples</span>
				<div className='flex flex-col space-y-2 pl-2 my-2 text-sm'>
					<Link to='/examples/data-fetching'>Data Fetching</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar
