import { db } from '$lib/database.js'

export async function load({ url }) {
	const movie_id = Number(url.pathname.split('/')[2])
	const movie = await db.movie.findFirst({
		where: {
			movie_id
		}
	})

	return { movie }
}
