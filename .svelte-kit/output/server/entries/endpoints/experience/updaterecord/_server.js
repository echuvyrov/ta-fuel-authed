import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function POST({ request }) {
  const record = await request.json();
  await prisma.foodLog.update({
    where: {
      id: record.id
    },
    data: {
      food_name: record.food_name,
      food_qty: parseInt(record.food_qty),
      fat_grams: parseInt(record.fat_grams),
      carbs_grams: parseInt(record.carbs_grams),
      protein_grams: parseInt(record.protein_grams),
      kkcals: parseInt(record.kkcals)
    }
  });
  return new Response(String("success"));
}
export {
  POST
};
