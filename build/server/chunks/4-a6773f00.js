import { PrismaClient } from '@prisma/client';
import { g as get_store_value } from './index3-d06080d5.js';
import { u as user, c as currentDate } from './stores-b6011d9d.js';
import './index2-4f7f68c2.js';

const prisma = new PrismaClient();
var foodNutrition = "wait for it...";
var dbData = [];
var allFoods = [];
var currDate = "";
const load = async ({ cookies }) => {
  currDate = get_store_value(currentDate);
  console.log("current date: " + JSON.stringify(currDate));
  await loadData();
  return {
    /**
     * Get nutrition data from the server
     */
    kcals: foodNutrition,
    rowData: dbData,
    foodReferences: allFoods,
    forDate: currDate
  };
};
async function loadData() {
  dbData = await prisma.foodLog.findMany({
    where: {
      user_id: user.name
    }
  });
  allFoods = await prisma.foodReference.findMany({
    where: {
      user_id: user.name
    },
    orderBy: {
      /* sort by date added, desc */
      createdAt: "desc"
    },
    take: 12
  });
}
const actions = {
  /**
   * Modify game state in reaction to a keypress. If client-side JavaScript
   * is available, this will happen in the browser instead of here
   */
  addfood: async ({ request, cookies }) => {
    const data = await request.formData();
    const nutritionData = JSON.parse(data.get("food"));
    if (Object.keys(nutritionData).length === 0)
      ;
    else {
      await prisma.foodLog.create({
        data: {
          user_id: user.name,
          food_name: nutritionData.food_name,
          food_qty: nutritionData.food_qty,
          fat_grams: nutritionData.fat_grams,
          carbs_grams: nutritionData.carbs_grams,
          protein_grams: nutritionData.protein_grams,
          kkcals: nutritionData.kkcals,
          feeding_date: currDate
        }
      });
    }
    return {
      location: "/foodlog"
    };
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 4;
const component = async () => (await import('./_page.svelte-546f79fd.js')).default;
const file = '_app/immutable/components/pages/experience/_page.svelte-3b4438ea.js';
const imports = ["_app/immutable/components/pages/experience/_page.svelte-3b4438ea.js","_app/immutable/chunks/index-188eb586.js"];
const stylesheets = ["_app/immutable/assets/_page-a9294dc1.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, stylesheets };
//# sourceMappingURL=4-a6773f00.js.map
