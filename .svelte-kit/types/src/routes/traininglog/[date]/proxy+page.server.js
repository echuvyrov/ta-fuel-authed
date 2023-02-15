// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores.js';
import {TrainingSmartAIThingie} from '../../SmartAIThingie.js';

const prisma = new PrismaClient()

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async ({ params })  => {
	return {

	};
};

/** */
export const actions = {
	createprogram:/** @param {import('./$types').RequestEvent} event */  async ({ request, cookies }) => {

		const data = await request.formData();
		const food = data.get('trainingprogram');

		// format training program as JSON with OpenAI
		var trainingProgram = await TrainingSmartAIThingie.askForJSON(food);
		// create training program and its associated training days in the database
		const newFoodReferenceEntry = await prisma.trainingProgram.create({
			data: {
				user_id: user.name,
				program_name: trainingProgram.program_name
			},
		})
	}
};
