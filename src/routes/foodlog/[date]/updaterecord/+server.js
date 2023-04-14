import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'
import { user } from '$lib/stores/stores';

const prisma = new PrismaClient()

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const record = await request.json();

  // if the food is null, perform a delete
  if (record.food_name == null) {
    const deleteFood = await prisma.foodLog.delete({
      where: {
        id: record.id,
      },
    })
  } else {
    const updateFood = await prisma.foodLog.update({
      where: {
        id: record.id,
      },
      data: {
        food_name: record.food_name,
        food_qty: parseFloat(record.food_qty),
        fat_grams: parseFloat(record.fat_grams),
        carbs_grams: parseFloat(record.carbs_grams),
        protein_grams: parseFloat(record.protein_grams),
        kkcals: parseInt(record.kkcals),
        user_id: user.name
      },
    })
  }

  return new Response(String("success"));
}
