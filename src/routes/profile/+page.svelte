<script lang="ts">
	import { enhance } from '$app/forms'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col">
		<div class="card w-full md:w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Profile</h2>
				<p>User ID: {data.user.userId}</p>
				<p>Username: {data.user.username}</p>
				<div class="card-actions">
					<form use:enhance method="post">
						<button type="submit" class="btn btn-warning">Sign out</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
