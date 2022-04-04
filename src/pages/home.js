import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<div className='flex items-center justify-center w-full min-h-screen'>
			<div className='flex flex-col items-center'>
				<h1 className='mb-5 text-6xl font-bold'>SWR Intro</h1>
				<Link to='/demo'>Get Started</Link>
			</div>
		</div>
	)
}

export default Home
