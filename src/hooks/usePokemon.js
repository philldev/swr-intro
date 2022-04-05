import useSWR from 'swr'
import { fetcher } from '../helpers/api'

export const usePokemon = (id, opt) => {
	return useSWR(id ? '/pokemon/' + id : null, fetcher, opt)
}
