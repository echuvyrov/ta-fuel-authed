import { PrismaClient } from "@prisma/client";
import { u as user } from "../../../../../chunks/stores.js";
const prisma = new PrismaClient();
async function POST({ request }) {
  const record = await request.json();
  if (record.food_name == null) {
    await prisma.foodLog.delete({
      where: {
        id: record.id
      }
    });
  } else {
    await prisma.foodLog.update({
      where: {
        id: record.id
      },
      data: {
        food_name: record.food_name,
        food_qty: parseFloat(record.food_qty),
        fat_grams: parseFloat(record.fat_grams),
        carbs_grams: parseFloat(record.carbs_grams),
        protein_grams: parseFloat(record.protein_grams),
        kkcals: parseInt(record.kkcals),
        user_id: user.name
      }
    });
  }
  return new Response(String("success"));
}
export {
  POST
};
