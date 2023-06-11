<script lang="ts">
	import { search } from '$lib/stores/search'
	import type { PageData } from './$types'

	const image_url = 'https://image.tmdb.org/t/p/w500'

	function getImageUrl(path: string) {
		let src: string
		if (path == '') {
			src = '/white_background.jpg'
		} else {
			src = `https://image.tmdb.org/t/p/w500/${path}`
		}

		return src
	}

	export let data: PageData
	$: filteredMovies = data.movies
		.sort((a, b) => {
			let aHasMatrix =
				a.title.toLowerCase().includes('matrix') || a.title.toLowerCase().includes('матрица')
			let bHasMatrix =
				b.title.toLowerCase().includes('matrix') || b.title.toLowerCase().includes('матрица')

			if (aHasMatrix && !bHasMatrix) {
				return -1
			} else if (!aHasMatrix && bHasMatrix) {
				return 1
			} else {
				return 0
			}
		})
		.filter((movie) => movie.title.toLowerCase().includes($search.toLowerCase()))
</script>

<div class="movies grid grid-cols-2 md:grid-cols-4 auto-rows-fr gap-4">
	{#each filteredMovies as movie}
		<div class="card relative">
			<a href="/movie/{movie.movie_id}">
				<img src={getImageUrl(movie.poster_path)} alt={movie.title} />
			</a>
			<div class="description font-bold text-xl">
				<h2>{movie.title}</h2>
			</div>
		</div>
	{/each}
</div>
