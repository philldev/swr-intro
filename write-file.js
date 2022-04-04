// create jsx file with fs.writeFile
const fs = require('fs')

const createFile = (fileName, data) => {
	fs.writeFile(fileName, data, (err) => {
		if (err) {
			console.log(err)
		}
	})
}

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

examples.forEach((item) => {
	const compName = item.pathId
		.split('-')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join('')
	createFile(
		'./src/pages/' + item.pathId + '.js',
		`
	   const ${compName} = () => {
			return (
				<div className='w-full h-full p-4'>
				</div>
			)
		}
		export default ${compName}
	`
	)
})
