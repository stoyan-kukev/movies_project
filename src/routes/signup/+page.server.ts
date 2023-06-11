import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { auth } from '$lib/server/lucia'

export const load = async ({ locals }) => {
	const { session } = await locals.validateUser()
	if (session) throw redirect(302, '/')
	return {}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData()
		const username = form.get('username')
		const password = form.get('password')

		if (typeof username !== 'string' || typeof password !== 'string') {
			return fail(400)
		}

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					username,
					role: 'admin'
				}
			})

			const session = await auth.createSession(user.userId)
			locals.setSession(session)
		} catch {
			return fail(400)
		}
	}
}
