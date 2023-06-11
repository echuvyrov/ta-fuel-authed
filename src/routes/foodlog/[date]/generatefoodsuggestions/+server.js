import {TrainingSmartAIThingie} from '../../../SmartAIThingie.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const record = await request.json();
  // ask LLM to suggest foods
	var foodIdea = await TrainingSmartAIThingie.askForFoodIdeaJSON(record.food_for_macros);				
  return new Response(JSON.stringify({ generated_food: foodIdea }));
}
