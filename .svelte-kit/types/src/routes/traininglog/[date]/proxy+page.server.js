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
		const trainingProgramRaw = data.get('trainingprogram');
		// format training program as JSON with OpenAI
		var trainingProgram = await TrainingSmartAIThingie.askForTrainingProgramJSON(trainingProgramRaw);
		console.log("training program: " + JSON.stringify(trainingProgram));

		// program name is likely irrelevant, so default to "New Program " + current date
        var trainingProgramName = "New Program " + new Date().toLocaleDateString();
        // let's set the end date to ~7 years from now
        var trainingProgramNameEndDate = new Date();
        trainingProgramNameEndDate.setFullYear(trainingProgramNameEndDate.getFullYear() + 7);

		// create a "shell" for the training program
		const newTrainingProgram = await prisma.trainingProgram.create({
			data: {
				user_id: user.name,
				program_name: trainingProgramName,
				end_date: trainingProgramNameEndDate
			},
		})

		// convert trainingProgramDay JSON to an array of objects
		trainingProgramArray = JSON.parse(trainingProgram);
		console.log("training program: " + JSON.stringify(trainingProgramArray));

		// now, and its associated training days for the training program to the database
		for (var i = 0; i < trainingProgramArray.length; i++) {
			// create a training day for the training program
			const newTrainingDay = await prisma.trainingProgramDay.create({
				data: {
					user_id: user.name,
					program_id: newTrainingProgram.id,
					day_name: trainingProgramArray[i].day_name
				},
			})
		}
	}
};
