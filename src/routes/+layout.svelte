<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { search } from '$lib/stores/search'
	import '../app.css'
	import type { LayoutData } from './$types'

	export let data: LayoutData
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start w-3/4 md:w-1/2">
		<div class="dropdown md:hidden flex-row z-10">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<label tabindex="0" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/></svg
				>
			</label>

			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				{#if !data.loggedIn}
					<li><a href="/login">Log in</a></li>
					<li><a href="/signup">Sign up</a></li>
				{:else}
					<li><a href="/profile">Profile</a></li>
					<li><a href="/movie/add">Add new movie</a></li>
				{/if}
			</ul>
			<a href="/" class="btn btn-ghost normal-case text-lg">Nemetschek Movies</a>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl hidden md:flex">Nemetschek Movies</a>
		<a href="/movie/add" class="hidden md:flex ml-4"><button class="btn">Add new movie</button></a>
	</div>
	<div class="navbar-end w-1/4 md:w-1/2">
		{#if $page.url.pathname == '/'}
			<div class="form-control">
				<input
					type="text"
					placeholder="Search"
					class="input input-bordered w-24 md:w-auto"
					bind:value={$search}
				/>
			</div>
		{/if}
		<div class="hidden md:flex">
			<ul class="menu menu-horizontal">
				{#if !data.loggedIn}
					<li><a href="/login"><button class="btn">Log in</button></a></li>
					<li><a href="/signup"><button class="btn">Sign up</button></a></li>
				{:else}
					<div class="dropdown dropdown-left z-20">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<label tabindex="0" class="btn btn-ghost rounded-btn">Profile</label>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul
							tabindex="0"
							class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
						>
							<div class="card w-full md:w-96 bg-base-100 shadow-xl">
								<div class="card-body">
									<p>User ID: {data.user.userId}</p>
									<p>Username: {data.user.username}</p>
									<div class="card-actions">
										<form action="/profile/?" method="post">
											<button type="submit" class="btn btn-warning">Sign out</button>
										</form>
									</div>
								</div>
							</div>
						</ul>
					</div>
				{/if}
			</ul>
		</div>
	</div>
</div>

<slot />
