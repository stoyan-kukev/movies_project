import { Movie, type IMovie } from '$lib/types/movie'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/api/movies')
	let movies: IMovie[] = []
	const data = await res.json()
	for (const movie of data) {
		movies = [...movies, Movie.parse(movie)]
	}

	return { movies }
}
