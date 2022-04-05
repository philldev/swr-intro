import useSWR from 'swr'
import { fetcher } from '../helpers/api'

export const usePokemons = ({ query = '' } = {}) => {
	return useSWR('/pokemon' + query, fetcher)
}
