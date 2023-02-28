import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores.js';
import {TrainingSmartAIThingie} from '../../SmartAIThingie.js';

const prisma = new PrismaClient()

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params })  => {
	return {

	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	createprogram: async ({ request, cookies }) => {

		const data = await request.formData();
		const trainingProgramRaw = data.get('trainingprogram');
		console.log("RAW training program: " + trainingProgramRaw);

		// format training program as JSON with OpenAI
		var trainingProgram = await TrainingSmartAIThingie.askForTrainingProgramJSON(trainingProgramRaw);
		console.log("training program: " + JSON.stringify(trainingProgram));
		// create training program and its associated training days in the database
		const newTrainingProgram = await prisma.trainingProgram.create({
			data: {
				user_id: user.name,
				program_name: trainingProgram.program_name,
				end_date: trainingProgram.end_date
			},
		})
	}
};
