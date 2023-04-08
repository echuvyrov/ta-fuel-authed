import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores';

const prisma = new PrismaClient()

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const record = await request.json();
  const existingRecord = await prisma.targetTotals.findFirst({
    where: {
      feeding_date: record.feeding_date,
      user_id: user.name
    }
  })
  if (existingRecord == null) {
    console.log("creating Record: " + record.feeding_datecl);
    //create a new TargetTotals record for the user
    const createFood = await prisma.targetTotals.create({
      data: {
        feeding_date: record.feeding_date,
        fat_grams: parseInt(record.fat_grams ? record.fat_grams : 0),
        carbs_grams: parseInt(record.carbs_grams ? record.carbs_grams : 0),
        protein_grams: parseInt(record.protein_grams ? record.protein_grams : 0),
        kcals: parseInt(record.Kcals ? record.Kcals : 0),
        user_id: user.name
      },
    })
  } else {
    console.log("existingRecord: " + existingRecord.id);
    //update the existing TargetTotals record
    const updateFood = await prisma.targetTotals.update ({
      where: {
        id: existingRecord.id,
      },
      data: {
        feeding_date: record.feeding_date,
        fat_grams: parseInt(record.fat_grams ? record.fat_grams : 0),
        carbs_grams: parseInt(record.carbs_grams ? record.carbs_grams : 0),
        protein_grams: parseInt(record.protein_grams ? record.protein_grams : 0),
        kcals: parseInt(record.Kcals ? record.Kcals : 0),
        user_id: user.name
      },
    })
  }

  return new Response(JSON.stringify({ status: 'success' }));
}
