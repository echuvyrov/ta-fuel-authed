// @ts-nocheck
import { NutritionSmartAIThingie } from '../../SmartAIThingie.js';
import { PrismaClient } from '@prisma/client'
import { currentDate, user, isAuthenticated } from '$lib/stores/stores';

const prisma = new PrismaClient()
var foodNutrition = "wait for it...";
var dbData = [];
var allFoods = [];
var forDate = "";
var targetTotals;
var calculatedTotals = {};
var differenceTotals = {};

/** @param {Parameters<import('../../../.svelte-kit/types/src/routes/foodlog/$types').PageServerLoad>[0]} event */
export const load = async ({ params }) => {

	if (!params.date) {
		// set forDate to today's date
		forDate = new Date().toString().split('T')[0];
	} else {
		/* create date from the params passed in (use local time) */
		forDate = params.date;
	}

	// set session variable for date to be accessible throughout the application
	currentDate.set(forDate);

	// load the data, but only if we have the user
	await loadData(forDate);
	return {
		/**
		 * Get nutrition data from the server
		 */
		kcals: foodNutrition,
		rowData: dbData,
		foodReferences: allFoods,
		targetTotals: targetTotals,
		calculatedTotals: calculatedTotals,
		differenceTotals: differenceTotals,
		today: forDate
	};
};

/**
 * @param {string | number | Date} date
 */
async function loadData(date) {
	console.log("user.name: " + user.name + ", is user name null? " + (user.name == null));

	dbData = await prisma.foodLog.findMany({
		where: {
			feeding_date: date,
			user_id: user.name,
		},
		orderBy: {
			createdAt: 'asc'
		}
	});

	/* to avoid 413 (payload too large) error, we need to limit the amount of data we send to the client */
	/* this is for Vercel only atm, but perhaps a rethink on image data is needed - storage instead of base64 in db */

	allFoods = await prisma.foodReference.findMany({
		// select everything except the image
		select: {
			food_name: true,
			food_qty: true,
			fat_grams: true,
			carbs_grams: true,
			protein_grams: true,
			kkcals: true
		},
		where: {
			user_id: { not: null },
			user_id: user.name,
		}
	});

	targetTotals = await prisma.targetTotals.findFirst({
		where: {
			feeding_date: date,
			user_id: { not: null },
			user_id: user.name
		}
	});

	if (targetTotals == null) {
		targetTotals = { label: "Target Totals" }
	} else {
		targetTotals.label = "Target Totals";
	}

	// sum up the columns in dbData and round to whole numbers
	calculatedTotals = dbData.reduce((acc, cur) => {
		acc.protein_grams += Math.round(cur.protein_grams);
		acc.carbs_grams += Math.round(cur.carbs_grams);
		acc.fat_grams += Math.round(cur.fat_grams);
		acc.kcals += Math.round(cur.kkcals);
		return acc;
	}, {
		protein_grams: 0,
		carbs_grams: 0,
		fat_grams: 0,
		kcals: 0
	});
	calculatedTotals.label = "Calculated Totals";

	// calculate the difference between the target and the actual
	differenceTotals = {
		label: "Difference",
		protein_grams: targetTotals.protein_grams - calculatedTotals.protein_grams,
		carbs_grams: targetTotals.carbs_grams - calculatedTotals.carbs_grams,
		fat_grams: targetTotals.fat_grams - calculatedTotals.fat_grams,
		kcals: targetTotals.kcals - calculatedTotals.kcals
	};
}

/* a function that calls DALL-E to generate an image and updates food log with that image async */
async function generateAndUpdateImage(food, entryId) {
	try {
		const imageBase64 = await NutritionSmartAIThingie.generateImage(food);
		await prisma.foodReference.update({
			where: { id: entryId },
			data: { imageBase64: imageBase64 }
		});
	} catch (error) {
		console.error('Failed to generate or update image:', error);
	}
}

/** */
export const actions = {
	/**
	 * add new food to the log, whether a lookup from a reference list or a result of calling chatGPT
	 */
	addfood:/** @param {import('./$types').RequestEvent} event */  async ({ request, cookies }) => {

		const data = await request.formData();
		const food = data.get('food');
		// check whether the food exists in the foodReference table
		const foodReferenceEntry = await prisma.foodReference.findFirst({
			where: {
				food_name: food,
				user_id: user.name
			}
		})

		// add the food to the log
		if (foodReferenceEntry != null) {
			nutritionData = foodReferenceEntry;
		} else {
			// look up food on OpenAI
			var nutritionData = await NutritionSmartAIThingie.askForJSON(food);
			//add the food to the foodReference table if it doesn't exist
			var imageBase64 = '' //await NutritionSmartAIThingie.generateImage(food);
			const newFoodReferenceEntry = await prisma.foodReference.create({
				data: {
					user_id: user.name,
					food_name: nutritionData.food_name,
					food_qty: nutritionData.food_qty,
					fat_grams: nutritionData.fat_grams,
					carbs_grams: nutritionData.carbs_grams,
					protein_grams: nutritionData.protein_grams,
					kkcals: nutritionData.kkcals,
					imageBase64: imageBase64
				},
			})

			generateAndUpdateImage(food, newFoodReferenceEntry.id); 
		}
		
		const newFoodLogEntry = await prisma.foodLog.create({
			data: {
				user_id: user.name,
				food_name: nutritionData.food_name,
				food_qty: nutritionData.food_qty,
				fat_grams: nutritionData.fat_grams,
				carbs_grams: nutritionData.carbs_grams,
				protein_grams: nutritionData.protein_grams,
				kkcals: nutritionData.kkcals,
				feeding_date: forDate
			},
		})

		// reload the data
		dbData = await prisma.foodLog.findMany({
			where: {
				feeding_date: forDate,
				user_id: user.name
			},
			orderBy: {
				createdAt: 'asc'
			}
		});

		allFoods = await prisma.foodReference.findMany({
			// select everything except the image
			select: {
				food_name: true,
				food_qty: true,
				fat_grams: true,
				carbs_grams: true,
				protein_grams: true,
				kkcals: true
			},
			where: {
				user_id: user.name,
			}
		});
	},
	/**
	 * add food to the log from the recipe provided by chatGPT
	 */
	addsuggestedfood:/** @param {import('./$types').RequestEvent} event */  async ({ request, cookies }) => {

		const data = await request.formData();
		const food = data.get('food');
		const food_qty = parseFloat(data.get('food_qty'));
		const fat_grams = parseFloat(data.get('fat_grams'));
		const carbs_grams = parseFloat(data.get('carbs_grams'));
		const protein_grams = parseFloat(data.get('protein_grams'));
		const total_kkcals = parseFloat(data.get('total_kkcals'));

		// check whether the food exists in the foodReference table
		const foodReferenceEntry = await prisma.foodReference.findFirst({
			where: {
				food_name: food,
				user_id: user.name
			}
		})

		// add the food to the log
		if (foodReferenceEntry != null) {
			nutritionData = foodReferenceEntry;
		} else {
			// generate an image for food
			var imageBase64 = '' // await NutritionSmartAIThingie.generateImage(food);
			// and write it to the foodReference table
			const newFoodReferenceEntry = await prisma.foodReference.create({
				data: {
					user_id: user.name,
					food_name: food,
					food_qty: food_qty,
					fat_grams: fat_grams,
					carbs_grams: carbs_grams,
					protein_grams: protein_grams,
					kkcals: total_kkcals,
					imageBase64: imageBase64
				},
			})
		}

		const newFoodLogEntry = await prisma.foodLog.create({
			data: {
				user_id: user.name,
				food_name: food,
				food_qty: food_qty,
				fat_grams: fat_grams,
				carbs_grams: carbs_grams,
				protein_grams: protein_grams,
				kkcals: total_kkcals,
				feeding_date: forDate
			},
		})

		// reload the data
		dbData = await prisma.foodLog.findMany({
			where: {
				feeding_date: forDate,
				user_id: user.name
			},
			orderBy: {
				createdAt: 'asc'
			}
		});

		allFoods = await prisma.foodReference.findMany({
			// select everything except the image
			select: {
				food_name: true,
				food_qty: true,
				fat_grams: true,
				carbs_grams: true,
				protein_grams: true,
				kkcals: true
			},
			where: {
				user_id: user.name,
			}
		});
	}
};
