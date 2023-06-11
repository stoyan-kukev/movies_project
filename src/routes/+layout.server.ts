import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = await locals.validateUser()

	let loggedIn = true
	if (!session) {
		loggedIn = false
	}

	return { loggedIn, user }
}
