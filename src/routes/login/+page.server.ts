import { auth } from '$lib/server/lucia.js'
import { redirect, type Actions, fail } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	const { session } = await locals.validateUser()
	if (session) throw redirect(302, '/')
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData()
		const username = form.get('username')
		const password = form.get('password')

		if (typeof username !== 'string' || typeof password !== 'string') return fail(400)

		try {
			const key = await auth.useKey('username', username, password)
			const session = await auth.createSession(key.userId)
			locals.setSession(session)
		} catch {
			return fail(400)
		}
	}
}
