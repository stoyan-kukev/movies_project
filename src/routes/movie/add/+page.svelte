<script lang="ts">
	import { enhance } from '$app/forms'
</script>

<div class="hero min-h-screen bg-base-200 -z-10 w-full">
	<div class="hero-content flex-col lg:flex-row-reverse max-w-full">
		<form method="post" use:enhance action="?/addMovie">
			<div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
				<div class="card-body">
					<div class="form-control">
						<label for="title" class="label"> Title: </label>
						<input type="text" name="title" class="input input-bordered" />
					</div>
					<div class="form-control">
						<label for="overview" class="label"> Overview: </label>
						<textarea name="overview" class="textarea textarea-bordered" />
					</div>
					<div class="form-control">
						<label for="date" class="label"> Release Date: </label>
						<input type="date" name="date" class="input input-bordered" />
					</div>
					<div class="form-control mt-6 flex-row justify-between">
						<button type="submit" class="btn btn-primary">Create Movie</button>
						<button type="submit" formaction="?/useTMDB" class="btn btn-secondary"
							>Add 20 movies using <img src="/tmdb_short.svg" alt="" /></button
						>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	button {
		width: 100px;
	}
</style>
