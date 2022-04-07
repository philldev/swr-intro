import { MutateData } from '../components/mutate-data'
import { RevalidateData } from '../components/revalidate-data'

const Mutation = () => {
	return (
		<div className='w-full h-full p-4'>
			<h1 className='mb-4 text-4xl font-bold'>Mutation</h1>
			<RevalidateData />
			<MutateData />
		</div>
	)
}

export default Mutation
