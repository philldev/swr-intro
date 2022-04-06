export const PokemonCard = ({ pokemon }) => {
	return (
		<div className='font-bold border rounded'>
			<p className='p-2 text-center'>{pokemon.name}</p>
		</div>
	)
}
