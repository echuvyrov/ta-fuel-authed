import {TrainingSmartAIThingie} from '../../../SmartAIThingie.js';

/** @type {import('./$types.js').RequestHandler} */
export async function POST({ request }) {
  const record = await request.json();
  // ask LLM to suggest foods
	var veganizedIdeas = await TrainingSmartAIThingie.askToVeganizeFood(record.veganize_this_food);				
  return new Response(JSON.stringify({ generated_food: veganizedIdeas }));
}