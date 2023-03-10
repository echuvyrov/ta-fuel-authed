// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores.js';
import {TrainingSmartAIThingie} from '../../SmartAIThingie.js';

const prisma = new PrismaClient()
var forDate = "";

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async ({ params })  => {
	var trainingDataForDay = [];

	if(!params.date) {
		// set forDate to today's date
		forDate = new Date().toString().split('T')[0];
	} else {
		/* create date from the params passed in (use local time) */
		forDate = params.date;
	}

	var currentTrainingProgramDays = await loadTraining(forDate);
	if(currentTrainingProgramDays == null) {
		currentTrainingProgramDays = { training_days: [] };
	} else {
		// sort the training days by day_order_num
		currentTrainingProgramDays.training_days.sort((a, b) => (a.day_order_num > b.day_order_num) ? 1 : -1);
	}
	
	return {
		trainingProgamDays: currentTrainingProgramDays,
		trainingData: trainingDataForDay
	};
};

/** */
export const actions = {
	createprogram:/** @param {import('./$types').RequestEvent} event */  async ({ request, cookies }) => {

		const data = await request.formData();
		const trainingProgramRaw = data.get('trainingprogram');
		// format training program as JSON with OpenAI
		var trainingProgramDays = await TrainingSmartAIThingie.askForTrainingProgramJSON(trainingProgramRaw);

		// program name is likely irrelevant, so default to "New Program " + current date
        var trainingProgramName = "New Program " + new Date().toLocaleDateString();
        // let's set the end date to seven years from now                                                                                                                                                    ~7 years from now
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

		// add associated training days for the training program to the database
		for (var i = 0; i < trainingProgramDays.length; i++) {
			// create training day for the new training program
			const newTrainingDay = await prisma.trainingProgramDay.create({
				data: {
					user_id: user.name,
					program: {
						connect: {
							id: newTrainingProgram.id
						}
					},
					day_order_num: i,
					end_date: trainingProgramNameEndDate,
					day_name: trainingProgramDays[i].day_name,
					day_description: trainingProgramDays[i].day_description,
				}
			})
		}
	}
};

async function loadTraining(date) {

	// select the first training program
	// 	where ending date is greater than today's date
	var trainingData = await prisma.trainingProgram.findFirst ({
		where: {
			user_id: user.name,
			end_date: {
				gte: new Date(date)
			}
		},
		// include the training days for the training program
		include: {
			training_days: true
		}
	});

	return trainingData;
}