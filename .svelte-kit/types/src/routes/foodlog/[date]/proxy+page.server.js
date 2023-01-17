// @ts-nocheck
import {NutritionSmartAIThingie, SmartAIThingie} from '../../SmartAIThingie.js';
import { PrismaClient } from '@prisma/client'
import { session } from '$app/stores';
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

	if(!params.date) {
		// set forDate to today's date
		forDate = new Date().toString().split('T')[0];
	} else {		
		/* create date from the params passed in (use local time) */
		forDate = params.date;
	}

	// set session variable for date to be accessible throughout the application
	currentDate.set(forDate);
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

	dbData = await prisma.foodLog.findMany({
		where: {
			feeding_date: date,
			user_id: user.name
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
			user_id: user.name,
		}
	});

	targetTotals = await prisma.targetTotals.findFirst({
		where: {
			protein_grams: { gt: 0 }
		}
	});
	targetTotals.label = "Target Totals";

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

/** */
export const actions = {
	/**
	 * Modify game state in reaction to a keypress. If client-side JavaScript
	 * is available, this will happen in the browser instead of here
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
			var imageBase64 = await NutritionSmartAIThingie.generateImage(food);
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
