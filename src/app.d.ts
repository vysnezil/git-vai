// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from '$lib/models/User';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
