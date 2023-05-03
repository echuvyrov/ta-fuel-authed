import { N as NutritionSmartAIThingie } from "../../../../chunks/SmartAIThingie.js";
import { PrismaClient } from "@prisma/client";
import { c as currentDate, u as user } from "../../../../chunks/stores.js";
const prisma = new PrismaClient();
var foodNutrition = "wait for it...";
var dbData = [];
var allFoods = [];
var forDate = "";
var targetTotals;
var calculatedTotals = {};
var differenceTotals = {};
const load = async ({ params }) => {
  if (!params.date) {
    forDate = new Date().toString().split("T")[0];
  } else {
    forDate = params.date;
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
    today: forDate
  };
};
async function loadData(date) {
  dbData = await prisma.foodLog.findMany({
    where: {
      feeding_date: date,
      user_id: user.name
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
      user_id: user.name
    }
  });
  targetTotals = await prisma.targetTotals.findFirst({
    where: {
      feeding_date: date
      //,
      // TODO: Figure out why this is not working in prod, the filter is failing as not defined
      // user_id: user.name
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
const actions = {
  /**
   * add new food to the log, whether a lookup from a reference list or a result of calling GPT-3
   */
  addfood: async ({ request, cookies }) => {
    const data = await request.formData();
    const food = data.get("food");
    const foodReferenceEntry = await prisma.foodReference.findFirst({
      where: {
        food_name: food,
        user_id: user.name
      }
    });
    if (foodReferenceEntry != null) {
      nutritionData = foodReferenceEntry;
    } else {
      var nutritionData = await NutritionSmartAIThingie.askForJSON(food);
      var imageBase64 = await NutritionSmartAIThingie.generateImage(food);
      await prisma.foodReference.create({
        data: {
          user_id: user.name,
          food_name: nutritionData.food_name,
          food_qty: nutritionData.food_qty,
          fat_grams: nutritionData.fat_grams,
          carbs_grams: nutritionData.carbs_grams,
          protein_grams: nutritionData.protein_grams,
          kkcals: nutritionData.kkcals,
          imageBase64
        }
      });
    }
    await prisma.foodLog.create({
      data: {
        user_id: user.name,
        food_name: nutritionData.food_name,
        food_qty: nutritionData.food_qty,
        fat_grams: nutritionData.fat_grams,
        carbs_grams: nutritionData.carbs_grams,
        protein_grams: nutritionData.protein_grams,
        kkcals: nutritionData.kkcals,
        feeding_date: forDate
      }
    });
    dbData = await prisma.foodLog.findMany({
      where: {
        feeding_date: forDate,
        user_id: user.name
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
        user_id: user.name
      }
    });
  }
};
export {
  actions,
  load
};
