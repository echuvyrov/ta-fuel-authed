// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { get } from "svelte/store";
import { currentDate, user } from "$lib/stores/stores.js";

const prisma = new PrismaClient();
var foodNutrition = "wait for it...";
var todaysFoodsWithImages = [];
var top30MostCommonFoods = [];
var currDate = "";
var nickname = "name";

/** @param {Parameters<import('../../$types').PageServerLoad>[0]} event */
export const load = async ({ params }) => {
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

	await loadData();
	return {
    	/**
     	* Get nutrition data from the server
     	*/
    	kcals: foodNutrition,
    	todaysFoods: todaysFoodsWithImages,
    	foodReferences: top30MostCommonFoods,
    	today: currDate,
		nickname: nickname,
  	};
};

async function loadData() {

	// first, get the user name corresponding to the nickname
	const userForNick = await prisma.userSettings.findFirst({
		where: {
			nickname: nickname
		}
	});

	// filter for specific user and date
	const todaysFoods = await prisma.foodLog.findMany({
    	where: {
      		user_id: userForNick?.user_id,
	  		feeding_date: currDate
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
		where: {
			user_id: user.name,
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