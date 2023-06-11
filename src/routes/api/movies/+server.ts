import { Movie } from '$lib/types/movie'
import { db } from '$lib/database'
import { json } from '@sveltejs/kit'

const TMDB_ID_LIMIT = 2_000_000

function getRandId() {
	return Math.round(Math.random() * (2147483647 - TMDB_ID_LIMIT) + TMDB_ID_LIMIT)
}

export async function GET() {
	const movies = await db.movie.findMany()

	return json(movies)
}

export async function POST({ request, locals }) {
	const { session } = await locals.validateUser()
	if (!session) return new Response("User isn't logged in", { status: 401 })

	const data = await request.json()
	const movie_data = Movie.safeParse(data)
	if (!movie_data.success)
		return new Response(JSON.stringify({ error: 'Something went wrong when parsing movie data' }), {
			status: 400
		})

	const user = await db.authUser.findUnique({
		where: {
			id: session.userId
		}
	})

	if (user?.role === 'admin') {
		let movie_id = movie_data.data.movie_id
		if (movie_id === null) {
			movie_id = getRandId()
		}

		const movie = await db.movie.create({
			data: {
				...movie_data.data,
				movie_id
			}
		})

		return json(movie)
	} else {
		return new Response(null, {
			status: 401
		})
	}
}
