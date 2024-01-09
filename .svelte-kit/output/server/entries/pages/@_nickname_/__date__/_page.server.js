import { PrismaClient } from "@prisma/client";
import { u as user } from "../../../../chunks/stores.js";
const prisma = new PrismaClient();
var foodNutrition = "wait for it...";
var todaysFoodsWithImages = [];
var top30MostCommonFoods = [];
var currDate = "";
var nickname = "name";
const load = async ({ params }) => {
  if (!params.date) {
    currDate = getLocalDate();
  } else {
    currDate = params.date;
  }
  if (!params.nickname)
    ;
  else {
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
    nickname
  };
};
async function loadData() {
  const userForNick = await prisma.userSettings.findFirst({
    where: {
      nickname
    }
  });
  const todaysFoods = await prisma.foodLog.findMany({
    where: {
      user_id: userForNick?.user_id,
      feeding_date: currDate
    }
  });
  todaysFoodsWithImages = await Promise.all(todaysFoods.map(async (food) => {
    const foodReference = await prisma.foodReference.findFirst({
      where: {
        food_name: food.food_name
      }
    });
    return {
      ...food,
      foodReference
    };
  }));
  const topFoods = await prisma.foodLog.groupBy({
    by: ["food_name"],
    _count: {
      food_name: true
    },
    orderBy: {
      _count: {
        food_name: "desc"
      }
    },
    where: {
      user_id: user.name
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
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const datePortion = `${year}-${month}-${day}`;
  return datePortion;
}
export {
  load
};
