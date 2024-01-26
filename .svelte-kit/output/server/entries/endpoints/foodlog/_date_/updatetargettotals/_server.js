import "../../../../../chunks/index.js";
import { PrismaClient } from "@prisma/client";
import { u as user } from "../../../../../chunks/stores.js";
const prisma = new PrismaClient();
async function POST({ request }) {
  const record = await request.json();
  const existingRecord = await prisma.targetTotals.findFirst({
    where: {
      feeding_date: record.feeding_date,
      user_id: user.name
    }
  });
  if (existingRecord == null) {
    await prisma.targetTotals.create({
      data: {
        feeding_date: record.feeding_date,
        fat_grams: parseInt(record.fat_grams ? record.fat_grams : 0),
        carbs_grams: parseInt(record.carbs_grams ? record.carbs_grams : 0),
        protein_grams: parseInt(record.protein_grams ? record.protein_grams : 0),
        kcals: parseInt(record.Kcals ? record.Kcals : 0),
        user_id: user.name
      }
    });
  } else {
    await prisma.targetTotals.update({
      where: {
        id: existingRecord.id
      },
      data: {
        feeding_date: record.feeding_date,
        fat_grams: parseInt(record.fat_grams ? record.fat_grams : 0),
        carbs_grams: parseInt(record.carbs_grams ? record.carbs_grams : 0),
        protein_grams: parseInt(record.protein_grams ? record.protein_grams : 0),
        kcals: parseInt(record.Kcals ? record.Kcals : 0),
        user_id: user.name
      }
    });
  }
  return new Response(JSON.stringify({ status: "success" }));
}
export {
  POST
};
