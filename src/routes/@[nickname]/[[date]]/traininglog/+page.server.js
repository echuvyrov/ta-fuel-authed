import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores.js';
import {TrainingSmartAIThingie} from '../../../SmartAIThingie.js';

const prisma = new PrismaClient();
var currDate = "";
var trainingDataForDay = [];
var exercises = [];
var selectedDayId = "";
var selectedDayDescription = "";
var nickname = "name";

/** @type {import('./[date]/$types.js').PageServerLoad} */
export const load = async ({ params })  => {

	if(!params.date) {
		//  set currDate to today's date (use local time)
		currDate = getLocalDate();

	} else {
		/* create date from the params passed in (use local time) */
		currDate = params.date;
	}
	
	if(!params.nickname) {

	} else {
		nickname = params.nickname;
	}

	var currentTrainingProgramDays = await loadTraining(currDate);
	if(currentTrainingProgramDays == null) {
		currentTrainingProgramDays = { training_days: [] };
	} else {
		// sort the training days by day_order_num
		currentTrainingProgramDays.training_days.sort((a, b) => (a.day_order_num > b.day_order_num) ? 1 : -1);
	}
	
	return {
		trainingProgamDays: currentTrainingProgramDays,
		exerciseReferences: exercises,
		selectedDayId: selectedDayId,
		selectedDayDescription: selectedDayDescription,
		today: currDate,
		nickname: nickname
	};
};

async function loadTraining(forDate) {

	// select the latest training program
	// 	where ending date is greater than today's date
	var trainingData = await prisma.trainingProgram.findFirst ({
		where: {
			user_id: user.name,
			end_date: {
				gte: new Date(forDate)
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

function getLocalDate() {
	const currentDate = new Date();

	// Extract the date portion
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
	const day = String(currentDate.getDate()).padStart(2, '0');

	// Create the date string in the format 'YYYY-MM-DD'
	const datePortion = `${year}-${month}-${day}`;

	return datePortion;
}