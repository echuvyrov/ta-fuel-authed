import "./index.js";
import dotenv from "dotenv";
dotenv.config();
class SmartAIThingie {
  /* a function that calls GPT-3 and returns the result */
  static async ask(prompt) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GPT3_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": prompt }],
        max_tokens: 512,
        temperature: 1
      })
    });
    var data = await response.json();
    return data;
  }
  static askForJSON(prompt) {
    var modifiedPrompt = prompt + "";
    return this.ask(modifiedPrompt);
  }
  /* a function that calls DALL-E to generate an image and returns it as a base64 string */
  static async generateImage(food) {
    const prompt = "A creative, appetizing photo of " + food + " using gourmet food photography in the style of Caroline Losse, with the following words '" + food + "' in it";
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GPT3_API_KEY
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "256x256",
        response_format: "b64_json"
      })
    });
    var imageData = await response.json();
    var imageBase64 = imageData.data[0].b64_json;
    return imageBase64;
  }
}
class NutritionSmartAIThingie extends SmartAIThingie {
  /* declare a class-wide variable to hold the food name */
  static food_name = "";
  static async ask(prompt) {
    var nutritionPrompt = prompt;
    return await super.ask(nutritionPrompt);
  }
  static async askForJSON(prompt) {
    this.food_name = prompt;
    var nutritionPrompt = "Show nutrition data for " + prompt + " and return it in the format: Food: Quantity: Calories: Fat: Carbs: Protein";
    var rawResponse = await super.askForJSON(nutritionPrompt);
    var parsedResponse = await this.parseResponse(rawResponse);
    var nutritionData = await this.parseNutrition(parsedResponse);
    return nutritionData;
  }
  /* a function to create a JSON object from a string with line breaks as separators for different elements */
  static async parseResponse(rawResponse) {
    console.log("rawResponse: " + JSON.stringify(rawResponse));
    var parsedResponse = {};
    var lines = rawResponse.choices[0].message.content.split("\n");
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.indexOf(":") > -1) {
        var key = line.substring(0, line.indexOf(":"));
        var value = line.substring(line.indexOf(":") + 1);
        parsedResponse[key] = value;
      } else if (line.indexOf("-") > -1) {
        var key = line.substring(0, line.indexOf("-"));
        var value = line.substring(line.indexOf("-") + 1);
        parsedResponse[key] = value;
      }
    }
    return parsedResponse;
  }
  static parseNutrition(parsedResponse) {
    var nutritionData = {};
    nutritionData.food_name = this.food_name;
    if (parsedResponse["Calories"]) {
      nutritionData["kkcals"] = parseFloat(parsedResponse["Calories"].replace(/[^0-9.]/g, ""));
    } else {
      nutritionData["kkcals"] = 0;
    }
    if (parsedResponse["Quantity"]) {
      nutritionData["food_qty"] = parseFloat(parsedResponse["Quantity"].match(/\d+/)[0]);
    } else {
      nutritionData["food_qty"] = 0;
    }
    if (parsedResponse["Calories"]) {
      nutritionData["kkcals"] = parseFloat(parsedResponse["Calories"].replace(/[^0-9.]/g, ""));
    } else {
      nutritionData["kkcals"] = 0;
    }
    if (parsedResponse["Protein"]) {
      nutritionData["protein_grams"] = parseFloat(parsedResponse["Protein"].replace(/[^0-9.]/g, ""));
    } else {
      nutritionData["protein_grams"] = 0;
    }
    if (parsedResponse["Fat"]) {
      nutritionData["fat_grams"] = parseFloat(parsedResponse["Fat"].replace(/[^0-9.]/g, ""));
    } else {
      nutritionData["fat_grams"] = 0;
    }
    if (parsedResponse["Carbs"]) {
      nutritionData["carbs_grams"] = parseFloat(parsedResponse["Carbs"].replace(/[^0-9.]/g, ""));
    } else {
      nutritionData["carbs_grams"] = 0;
    }
    return nutritionData;
  }
}
class TrainingSmartAIThingie extends SmartAIThingie {
  static async ask(prompt) {
    var trainingPrompt = prompt;
    return await super.ask(trainingPrompt);
  }
  static async askForTrainingProgramJSON(prompt) {
    var trainingProgramPrompt = "Return an array of JSON objects representing                 the following exercise program, removing all non-JSON characters. Each                 JSON objects should be in the format { day_name, day_description }. Do not                confirm, do not output anything else other than JSON array." + prompt;
    var rawResponse = await super.askForJSON(trainingProgramPrompt);
    var trainingData = await this.parseTraining(rawResponse);
    return trainingData;
  }
  static async askForKCalsJSON(prompt) {
    var activityPrompt = "Return the number of kilocalories burned for the following                                 activity. Do not offer explanations, before or after. Just                                 return a single number. Here's the activity: " + prompt;
    var rawResponse = await super.askForJSON(activityPrompt);
    var kcalsData = rawResponse.choices[0].message.content;
    return kcalsData;
  }
  static async askForFoodIdeaJSON(prompt) {
    var foodMacrosPrompt = "I need help trying to come up with food or recipe for the following macros.                                 Please respond with details on ingredient size, as well as macros for each ingredient.                                 Package the response as JSON with the following fields:                                 food_name, food_description, food_recipe, total_fat_grams, total_carbs_grams,                                 total_protein_grams, total_kkcals. Here's the prompt: " + prompt;
    var rawResponse = await super.askForJSON(foodMacrosPrompt);
    var foodIdeaJSON = rawResponse.choices[0].message.content;
    return foodIdeaJSON;
  }
  static async askToVeganizeFoodJSON(prompt) {
    let veganizerPrompt = "Please analyze my daily food log below and make recommendations 		on how I can substitute each one of them with vegan equivalents that have roughly the same nutritional profile 		in terms of protein, fat and carbs.         If no substitutions are needed, state that.         Do not overanalyze things: if food such as bread is generally vegan, don't bother suggesting a vegan bread.         Try not to be too verbose, but do be specific.         Ignore the items that you cannot interpret.         For the cases where substitutions are needed, provide a brief reason why substitution is needed.         For each item that needs to be substituted, make as specific recommendation as you can, with brand name,         quantity and nutritional breakdown in terms of fats, carbs and protein to closely match the nutritional profile of the original food.         Similarly, try to recognize brands that are vegan, such as Impossible or Beyond, and don't bother suggesting a vegan version of a brand         Here's my daily food intake: \n\n" + prompt;
    var rawResponse = await super.askForJSON(veganizerPrompt);
    var veganizedFoods = rawResponse.choices[0].message.content;
    return veganizedFoods;
  }
  /* a function to create an array from a string with line breaks as separators for different elements */
  static async parseTraining(rawResponse) {
    var rawTrainingJSON = rawResponse.choices[0].message.content;
    console.log("rawTrainingJSON: " + rawTrainingJSON);
    console.log("rawTrainingJSON: " + JSON.stringify(JSON.parse(rawTrainingJSON)));
    return JSON.parse(rawTrainingJSON);
  }
  static async askForActivityKCals(prompt) {
    console.log("asking for total kcals" + prompt);
    var totalKCals = await this.askForKCalsJSON(prompt);
    console.log("total KCals for Activity: " + totalKCals);
    return totalKCals;
  }
  static async askForFoodIdeas(prompt) {
    console.log("asking for food ideas " + prompt);
    var foodIdea = await this.askForFoodIdeaJSON(prompt);
    console.log("Food Idea for given Macros: " + foodIdea);
    return foodIdea;
  }
  static async askToVeganizeFood(prompt) {
    console.log("asking to veganize food " + prompt);
    var veganizedFoods = await this.askToVeganizeFoodJSON(prompt);
    console.log("Food Idea for given Macros: " + veganizedFoods);
    return veganizedFoods;
  }
}
export {
  NutritionSmartAIThingie as N,
  TrainingSmartAIThingie as T
};
