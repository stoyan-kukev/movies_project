<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	let movie = data.movie

	let src: string
	if (movie?.backdrop_path == '') {
		src = '/white_background.jpg'
	} else {
		src = `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row">
		<img {src} class="rounded-lg shadow-2xl" alt={movie?.title} />
		<div>
			<h1 class="text-5xl font-bold">{movie?.title}</h1>
			<p class="py-6">{movie?.overview}</p>
		</div>
	</div>
</div>
