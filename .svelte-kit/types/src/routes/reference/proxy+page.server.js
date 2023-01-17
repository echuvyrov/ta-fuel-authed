// @ts-nocheck
import {NutritionSmartAIThingie, SmartAIThingie} from '../SmartAIThingie.js';
import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores.js';

const prisma = new PrismaClient()
var foodNutrition = "wait for it...";
var allFoods = [];

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async ({ params })  => {
	await loadData();
	return {
		/**
		 * Get nutrition data from the server
		 */
		kcals: foodNutrition,
		rowData: allFoods
	};
};

async function loadData() {
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

		//add the food to the foodReference table if it doesn't exist
		if (foodReferenceEntry == null) {
			// look up food on OpenAI
			var nutritionData = await NutritionSmartAIThingie.askForJSON(food);
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
