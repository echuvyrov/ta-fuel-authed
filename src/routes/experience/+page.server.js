import { PrismaClient } from "@prisma/client";
import { get } from "svelte/store";
import { currentDate, user } from "$lib/stores/stores.js";

const prisma = new PrismaClient();
var foodNutrition = "wait for it...";
var todaysFoodsWithImages = [];
var top30MostCommonFoods = [];

var currDate = "";
const today = new Date();
// get month with leading zero
const todayString = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ cookies }) => {
  currDate = get(currentDate);

  await loadData();
  return {
    /**
     * Get nutrition data from the server
     */
    kcals: foodNutrition,
    todaysFoods: todaysFoodsWithImages,
    foodReferences: top30MostCommonFoods,
    forDate: currDate,
  };
};

async function loadData() {
	// filter for specific user and date
	const todaysFoods = await prisma.foodLog.findMany({
    	where: {
      		user_id: user.name,
	  		feeding_date: todayString
    	},
  	});

	todaysFoodsWithImages = await Promise.all(todaysFoods.map(async (food) => {
		const foodReference = await prisma.foodReference.findFirst({
	  	where: {
			food_name: food.food_name
	  	}
		});
		return {
			...food,
	 		foodReference,
		};
  	}));

  	// get the top 30 most common foods for this user
  	//  based on the number of times foods appear in the foodLog table
  	const topFoods = await prisma.foodLog.groupBy({
		by: ['food_name'],
			_count: {
	  		food_name: true
		},
		orderBy: {
	  	_count: {
			food_name: 'desc'
	  		}
		},
		take: 30
	});
  
  	top30MostCommonFoods = await Promise.all(topFoods.map(async (food) => {
		const foodReference = await prisma.foodReference.findFirst({
	  	where: {
			food_name: food.food_name
	  	}
		});
		return {
			...food,
	 		foodReference,
			count: food._count.food_name
		};
  	}));
}

/** @type {import('./$types').Actions} */
export const actions = {
  /**
   * Modify game state in reaction to a keypress. If client-side JavaScript
   * is available, this will happen in the browser instead of here
   */
  addfood: async ({ request, cookies }) => {
    const data = await request.formData();
    const nutritionData = JSON.parse(data.get("food"));

    /* check if the object is empty */
    if (Object.keys(nutritionData).length === 0) {
      // do nothing
    } else {
		console.log("adding food for date: " + todayString);

		// add the food to the database
      const newFoodLogEntry = await prisma.foodLog.create({
        data: {
          user_id: user.name,
          food_name: nutritionData.food_name,
          food_qty: nutritionData.food_qty,
          fat_grams: nutritionData.fat_grams,
          carbs_grams: nutritionData.carbs_grams,
          protein_grams: nutritionData.protein_grams,
          kkcals: nutritionData.kkcals,
          feeding_date: todayString,
        },
      });
    }

    return {
      location: "/foodlog",
    };
  },
};
