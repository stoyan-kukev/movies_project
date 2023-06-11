<script lang="ts">
	import { enhance } from '$app/forms'
</script>

<div>
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col lg:flex-row-reverse">
			<form method="post" use:enhance>
				<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div class="card-body">
						<div class="form-control">
							<label for="username" class="label"><span class="label-text">Username</span></label>
							<input type="text" id="username" name="username" class="input input-bordered" />
						</div>
						<div class="form-control">
							<label for="password" class="label"><span class="label-text">Password</span></label>
							<input type="password" id="password" name="password" class="input input-bordered" />
						</div>
						<div class="form-control mt-6">
							<button class="btn btn-primary">Sign up</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
