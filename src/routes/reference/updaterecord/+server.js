import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'
import { isAuthenticated, user } from "$lib/stores/stores";	

const prisma = new PrismaClient()

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const record = await request.json();
  const updateFood = await prisma.foodReference.update({
    where: {
      id: record.id,
    },
    data: {
      food_name: record.food_name,
      food_qty: parseInt(record.food_qty),
      fat_grams: parseInt(record.fat_grams),
      carbs_grams: parseInt(record.carbs_grams),
      protein_grams: parseInt(record.protein_grams),
      kkcals: parseInt(record.kkcals),
      user_id: user.name
    },
  })
  return new Response(String("success"));
}
