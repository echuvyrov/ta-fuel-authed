import {NutritionSmartAIThingie} from '../../../SmartAIThingie.js';
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
var nickname = "name";

/** @type {import('../../../.svelte-kit/types/src/routes/foodlog/$types').PageServerLoad} */
export const load = async ({ params }) => {

	if(!params.date) {
		// set forDate to today's date
		forDate = getLocalDate();
	} else {
		/* create date from the params passed in (use local time) */
		forDate = params.date;
	}

	if(!params.nickname) {

	} else {
		nickname = params.nickname;
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
		today: forDate,
		nickname: nickname
	};
};

/**
 * @param {string | number | Date} date
 */
async function loadData(date) {
	// first, get the user name corresponding to the nickname
	const userForNick = await prisma.userSettings.findFirst({
		where: {
			nickname: nickname
		}
	});

	dbData = await prisma.foodLog.findMany({
		where: {
			feeding_date: date,
			user_id: userForNick?.user_id
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
			user_id: {	not: null},
			user_id: userForNick?.user_id,
		}
	});

	targetTotals = await prisma.targetTotals.findFirst({
		where: {
			feeding_date: date,
			user_id: {	not: null},
			user_id: userForNick?.user_id
		}
	});

	if (targetTotals == null) {
		targetTotals = { label: "Target Totals"}
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