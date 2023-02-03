import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores.js';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params })  => {
	return {

	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	createprogram: async ({ request, cookies }) => {

		const data = await request.formData();		

	}
};
