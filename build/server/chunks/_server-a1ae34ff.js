import './index-36410280.js';
import { PrismaClient } from '@prisma/client';
import './stores-b6011d9d.js';
import './index2-4f7f68c2.js';
import './index3-d06080d5.js';

const prisma = new PrismaClient();
async function POST({ request }) {
  const record = await request.json();
  await prisma.foodReference.update({
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

export { POST };
//# sourceMappingURL=_server-a1ae34ff.js.map
