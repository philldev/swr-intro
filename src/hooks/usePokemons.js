import { useCallback } from 'react'
import useSWR from 'swr'

import useSWRInfinite from 'swr/infinite'

import { fetcher } from '../helpers/api'

export const usePokemons = ({ query = '' } = {}) => {
	return useSWR('/pokemon' + query, fetcher)
}

export const usePokemonsInfinite = (size) => {
	const getKey = useCallback(
		(prevIndex, prevData) => {
			if (prevData && !prevData.length) return null
			return `/pokemon?limit=${size}&offset=${
				prevIndex > 0 ? prevIndex * size : ''
			}`
		},
		[size]
	)

	return useSWRInfinite(getKey, async (key) => {
		const res = await fetcher(key)
		return res.results
	})
}
