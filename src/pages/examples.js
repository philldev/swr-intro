import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'

const Examples = () => {
	return (
		<div className='min-h-screen overflow-x-hidden bg-slate-50'>
			<div className='w-[250px] fixed h-full bottom-0 left-0 top-0'>
				<Navbar />
			</div>
			<div className='fixed w-full left-[250px] h-full right-0 top-0 bottom-0'>
				<Outlet />
			</div>
		</div>
	)
}

export default Examples
