import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores.js';
import {TrainingSmartAIThingie} from '../../SmartAIThingie.js';

const prisma = new PrismaClient();
var forDate = "";
var trainingDataForDay = [];
var exercises = [];

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params })  => {

	// load all exercises from the database
	exercises = await prisma.exerciseReference.findMany({
		// select everything except the image
		select: {
			exercise_name: true,
			user_id: true,
			id: true
		},
		where: {
			user_id: user.name,
		},
		orderBy: {
			exercise_name: 'asc'
		}
	});

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
		exerciseReferences: exercises
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	createprogram: async ({ request, cookies }) => {

		const data = await request.formData();
		const trainingProgramRaw = data.get('trainingprogram');
		// format training program as JSON with OpenAI
		var trainingProgramDays = await TrainingSmartAIThingie.askForTrainingProgramJSON(trainingProgramRaw);

		// program name is likely irrelevant, so default to "New Program " + current date
        var trainingProgramName = "New Program " + new Date().toLocaleDateString();
        // let's set the end date to seven years from now                                                                                                                                                   ~7 years from now
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
					training_grid: []
				}
			})
		}
	},

	addexercise:  async ({ request, cookies }) => {
		// extract the id of the day being updated from the request
		const data = await request.formData();
		const dayId = data.get('day_id');
		const exerciseName = data.get('exercise_name');
		let exerciseDate = data.get('exercise_date');
		const exerciseLoad = data.get('exercise_load');
		const exerciseReps = data.get('exercise_reps');
		let exerciseValue = exerciseLoad;
		if (exerciseReps != null && exerciseReps != "") {
			exerciseValue += " x " + exerciseReps;
		}

		var currentDate = new Date();
		// Set the date to be 5 years from now
		var endProgramDate = new Date();
		endProgramDate.setFullYear(currentDate.getFullYear() + 5)
		var newDayIdToLoad = dayId;

		// look up exercise in the ExerciseReference and add it if it doesn't exist
		const exerciseReference = await prisma.exerciseReference.findFirst({
			where: {
				exercise_name: exerciseName
			}
		});

		if(exerciseReference == null) {
			// create a new exercise reference
			const newExerciseReference = await prisma.exerciseReference.create({
				data: {
					exercise_name: exerciseName
				}
			});
		}

		// if dayId is 0, this means that there's no training program defined and the user
		//  just wants to add the records directly into the grid
		//  so, we'll create a new training program and add the exercise to the first day
		if(dayId == 0) {
			// create a "shell" for the training program
			const newTrainingProgram = await prisma.trainingProgram.create({
				data: {
					user_id: user.name,
					program_name: "Training kicked off " + new Date().toLocaleDateString(),
					// set end date to be 5 years from now
					end_date: endProgramDate.toISOString()
				},
			})

			let gridRow = [{ "exercise": exerciseName, [exerciseDate]: exerciseValue }];
			const newTrainingDay = await prisma.trainingProgramDay.create({
				data: {
					user_id: user.name,
					day_name: exerciseDate.toString(),
					day_description: "Training on " + exerciseDate.toString(),
					day_order_num: 0,
					end_date: endProgramDate.toISOString(),
					training_grid: gridRow,
					program: {
						connect: {
							id: newTrainingProgram.id
						}
					}
				}
			})

			newDayIdToLoad = newTrainingDay.id;

		} else {
			// updating an existing training day
			const trainingDay = await prisma.trainingProgramDay.findUnique({
				where: {
					id: dayId
				}
			});

			// extract trainingGrid from the record and parse it in the format of 
			//  { "exercise": "exercise name", "date1": "some sets and weights and notes value", "date2": "some sets and eights and notes value"....}
			console.log("extracting training grid : " + JSON.stringify(trainingDay.training_grid));
			var trainingGrid = trainingDay.training_grid;
			trainingGrid.push({ "exercise": exerciseName, [exerciseDate]: exerciseValue });
			console.log("trainingGrid: " + JSON.stringify(trainingGrid));
			
			// persist JSON to the database
			const updatedTrainingDay = await prisma.trainingProgramDay.update({
				where: {
					id: dayId
				},
				data: {
					training_grid: trainingGrid
				}
			});
		}
	}
};

async function loadTraining(date) {

	// select the latest training program
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
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return trainingData;
}