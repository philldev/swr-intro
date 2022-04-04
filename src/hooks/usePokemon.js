import useSWR from 'swr'

export const usePokemons = () => {
	return useSWR('/pokemon')
}
