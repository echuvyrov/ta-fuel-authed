import { N as NutritionSmartAIThingie } from "../../../chunks/SmartAIThingie.js";
import { PrismaClient } from "@prisma/client";
import { u as user } from "../../../chunks/stores.js";
const prisma = new PrismaClient();
var foodNutrition = "wait for it...";
var allFoods = [];
const load = async ({ params }) => {
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
      kkcals: true,
      user_id: true,
      id: true
    },
    where: {
      user_id: user.name
    },
    orderBy: {
      food_name: "asc"
    }
  });
}
const actions = {
  /**
   * Modify game state in reaction to a keypress. If client-side JavaScript
   * is available, this will happen in the browser instead of here
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
    if (foodReferenceEntry == null) {
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
      },
      orderBy: {
        food_name: "asc"
      }
    });
  }
};
export {
  actions,
  load
};
