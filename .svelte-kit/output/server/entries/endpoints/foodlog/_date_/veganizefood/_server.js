import { T as TrainingSmartAIThingie } from "../../../../../chunks/SmartAIThingie.js";
async function POST({ request }) {
  const record = await request.json();
  var veganizedIdeas = await TrainingSmartAIThingie.askToVeganizeFood(record.veganize_this_food);
  return new Response(JSON.stringify({ generated_food: veganizedIdeas }));
}
export {
  POST
};
