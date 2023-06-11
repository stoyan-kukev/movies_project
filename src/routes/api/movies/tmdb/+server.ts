import { TMDB_KEY } from '$env/static/private'
import { current_page, nextPage } from '$lib/tmdb'
import { json } from '@sveltejs/kit'

export async function GET({ fetch }) {
	const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${current_page}&api_key=${TMDB_KEY}`
	const res = await fetch(url)
	const data = await res.json()
	// this is global mutable state, this is very bad, don't do this
	nextPage()

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const movies: IMovie[] = data.results.map((movie) => {
		return {
			backdrop_path: movie.backdrop_path,
			movie_id: movie.id,
			overview: movie.overview,
			poster_path: movie.poster_path,
			release_date: movie.release_date,
			title: movie.title,
			vote_average: movie.vote_average
		}
	})

	return json(movies)
}
