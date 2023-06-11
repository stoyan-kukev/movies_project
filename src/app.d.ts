// src/app.d.ts
/// <reference types="@sveltejs/kit" />
declare namespace App {
	type AuthRequest = import('lucia-auth').AuthRequest
	// Locals must be an interface and not a type
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Locals extends AuthRequest {}
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
	// ...
	type UserAttributes = {
		username: string
		role: string
	}
}
