import lucia from 'lucia-auth'
import { sveltekit } from 'lucia-auth/middleware'
import { dev } from '$app/environment'
import prisma from '@lucia-auth/adapter-prisma'
import { db } from '$lib/database'

export const auth = lucia({
	adapter: prisma(db),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		}
	}
})

export type Auth = typeof auth
