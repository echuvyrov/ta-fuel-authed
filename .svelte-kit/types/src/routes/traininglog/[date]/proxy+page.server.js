// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores.js';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async ({ params })  => {
	return {

	};
};

/** */
export const actions = {
	createprogram:/** @param {import('./$types').RequestEvent} event */  async ({ request, cookies }) => {

		const data = await request.formData();		

	}
};
