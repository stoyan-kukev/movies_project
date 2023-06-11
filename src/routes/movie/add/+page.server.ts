import type { IMovie } from '$lib/types/movie'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.validateUser()
	if (!session) throw redirect(303, '/login')
}

export const actions: Actions = {
	addMovie: async ({ request, fetch }) => {
		const formData = await request.formData()
		const title = formData.get('title')
		if (!title) return fail(400, { title, missing: true })

		const overview = formData.get('overview')
		if (!overview) return fail(400, { overview, missing: true })

		const date = formData.get('date')
		if (!date) return fail(400, { date, missing: true })

		const movie: IMovie = {
			title: String(title),
			overview: String(overview),
			release_date: String(date),
			backdrop_path: '',
			poster_path: '',
			movie_id: null,
			vote_average: 0.0
		}

		fetch('/api/movies', {
			method: 'POST',
			body: JSON.stringify(movie)
		})

		throw redirect(302, '/')
	},
	useTMDB: async ({ fetch }) => {
		const res = await fetch('/api/movies/tmdb')
		const movies = await res.json()
		for (const movie of movies) {
			fetch('/api/movies', {
				method: 'POST',
				body: JSON.stringify(movie)
			})
		}

		throw redirect(302, '/')
	}
}
