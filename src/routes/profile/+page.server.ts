import { redirect, type Actions, fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { auth } from '$lib/server/lucia'

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.validateUser()
	if (!user) throw redirect(302, '/login')
	return {
		user
	}
}

export const actions: Actions = {
	default: async ({ locals }) => {
		const { session } = await locals.validateUser()
		if (!session) return fail(401)
		await auth.invalidateSession(session.sessionId)
		locals.setSession(null)
	}
}
