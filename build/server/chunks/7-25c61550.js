import { N as NutritionSmartAIThingie } from './SmartAIThingie-92ddd1ac.js';
import { PrismaClient } from '@prisma/client';
import { u as user } from './stores-b6011d9d.js';
import './index-36410280.js';
import 'dotenv';
import './index2-4f7f68c2.js';
import './index3-d06080d5.js';

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

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
const component = async () => (await import('./_page.svelte-e577abd2.js')).default;
const file = '_app/immutable/components/pages/reference/_page.svelte-caced1a9.js';
const imports = ["_app/immutable/components/pages/reference/_page.svelte-caced1a9.js","_app/immutable/chunks/index-188eb586.js","_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang-146fd073.js"];
const stylesheets = ["_app/immutable/assets/_page-00f3fc8b.css","_app/immutable/assets/ArrowUp-d004936d.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, stylesheets };
//# sourceMappingURL=7-25c61550.js.map
