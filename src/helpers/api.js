export const API_URL = 'https://pokeapi.co/api/v2'
export const fetcher = (resource, init) =>
	fetch(API_URL + resource, init).then((res) => res.json())
