import './index-36410280.js';
import dotenv from 'dotenv';

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
  /* a function to create an array from a string with line breaks as separators for different elements */
  static async parseTraining(rawResponse) {
    var rawTrainingJSON = rawResponse.choices[0].message.content;
    console.log("rawTrainingJSON: " + rawTrainingJSON);
    console.log("rawTrainingJSON: " + JSON.stringify(JSON.parse(rawTrainingJSON)));
    return JSON.parse(rawTrainingJSON);
  }
}

export { NutritionSmartAIThingie as N, TrainingSmartAIThingie as T };
//# sourceMappingURL=SmartAIThingie-92ddd1ac.js.map
