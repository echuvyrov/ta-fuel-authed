import { T as TrainingSmartAIThingie } from "../../../../../chunks/SmartAIThingie.js";
async function POST({ request }) {
  const record = await request.json();
  var foodIdea = await TrainingSmartAIThingie.askForFoodIdeaJSON(record.food_for_macros);
  return new Response(JSON.stringify({ generated_food: foodIdea }));
}
export {
  POST
};
