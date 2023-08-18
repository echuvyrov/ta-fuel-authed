import "../../../../../chunks/SmartAIThingie.js";
import { PrismaClient } from "@prisma/client";
import { c as currentDate } from "../../../../../chunks/stores.js";
const prisma = new PrismaClient();
var foodNutrition = "wait for it...";
var dbData = [];
var allFoods = [];
var forDate = "";
var targetTotals;
var calculatedTotals = {};
var differenceTotals = {};
var nickname = "name";
const load = async ({ params }) => {
  if (!params.date) {
    forDate = getLocalDate();
  } else {
    forDate = params.date;
  }
  if (!params.nickname)
    ;
  else {
    nickname = params.nickname;
  }
  currentDate.set(forDate);
  await loadData(forDate);
  return {
    /**
     * Get nutrition data from the server
     */
    kcals: foodNutrition,
    rowData: dbData,
    foodReferences: allFoods,
    targetTotals,
    calculatedTotals,
    differenceTotals,
    today: forDate,
    nickname
  };
};
async function loadData(date) {
  const userForNick = await prisma.userSettings.findFirst({
    where: {
      nickname
    }
  });
  dbData = await prisma.foodLog.findMany({
    where: {
      feeding_date: date,
      user_id: userForNick?.user_id
    },
    orderBy: {
      createdAt: "asc"
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
      user_id: { not: null },
      user_id: userForNick?.user_id
    }
  });
  targetTotals = await prisma.targetTotals.findFirst({
    where: {
      feeding_date: date,
      user_id: { not: null },
      user_id: userForNick?.user_id
    }
  });
  if (targetTotals == null) {
    targetTotals = { label: "Target Totals" };
  } else {
    targetTotals.label = "Target Totals";
  }
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
  differenceTotals = {
    label: "Difference",
    protein_grams: targetTotals.protein_grams - calculatedTotals.protein_grams,
    carbs_grams: targetTotals.carbs_grams - calculatedTotals.carbs_grams,
    fat_grams: targetTotals.fat_grams - calculatedTotals.fat_grams,
    kcals: targetTotals.kcals - calculatedTotals.kcals
  };
}
function getLocalDate() {
  const currentDate2 = new Date();
  const year = currentDate2.getFullYear();
  const month = String(currentDate2.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate2.getDate()).padStart(2, "0");
  const datePortion = `${year}-${month}-${day}`;
  return datePortion;
}
export {
  load
};
