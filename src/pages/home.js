import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<div className='w-full min-h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center'>
				<h1 className='text-6xl font-bold mb-5'>SWR Intro</h1>
				<Link to='/examples'>see examples</Link>
			</div>
		</div>
	)
}

export default Home
