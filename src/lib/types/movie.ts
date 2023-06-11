import { z } from 'zod'

export const Movie = z.object({
	backdrop_path: z.string(),
	movie_id: z.number().nullable(),
	overview: z.string(),
	poster_path: z.string(),
	release_date: z.string(),
	title: z.string(),
	vote_average: z.number()
})

export type IMovie = z.infer<typeof Movie>
