import { PrismaClient } from "@prisma/client";
import { u as user } from "../../../../chunks/stores.js";
import { T as TrainingSmartAIThingie } from "../../../../chunks/SmartAIThingie.js";
const prisma = new PrismaClient();
var forDate = "";
const load = async ({ params }) => {
  var trainingDataForDay = [
    { "exercise": "Push-ups", "exercise_date": "2022-01-01" },
    { "exercise": "Squats", "exercise_date": "2022-01-02" },
    { "exercise": "Sit-ups", "exercise_date": "2022-01-03" }
  ];
  if (!params.date) {
    forDate = new Date().toString().split("T")[0];
  } else {
    forDate = params.date;
  }
  var currentTrainingProgramDays = await loadTraining(forDate);
  if (currentTrainingProgramDays == null) {
    currentTrainingProgramDays = { training_days: [] };
  } else {
    currentTrainingProgramDays.training_days.sort((a, b) => a.day_order_num > b.day_order_num ? 1 : -1);
  }
  return {
    trainingProgamDays: currentTrainingProgramDays,
    trainingData: trainingDataForDay
  };
};
const actions = {
  createprogram: async ({ request, cookies }) => {
    const data = await request.formData();
    const trainingProgramRaw = data.get("trainingprogram");
    var trainingProgramDays = await TrainingSmartAIThingie.askForTrainingProgramJSON(trainingProgramRaw);
    var trainingProgramName = "New Program " + new Date().toLocaleDateString();
    var trainingProgramNameEndDate = new Date();
    trainingProgramNameEndDate.setFullYear(trainingProgramNameEndDate.getFullYear() + 7);
    const newTrainingProgram = await prisma.trainingProgram.create({
      data: {
        user_id: user.name,
        program_name: trainingProgramName,
        end_date: trainingProgramNameEndDate
      }
    });
    for (var i = 0; i < trainingProgramDays.length; i++) {
      await prisma.trainingProgramDay.create({
        data: {
          user_id: user.name,
          program: {
            connect: {
              id: newTrainingProgram.id
            }
          },
          day_order_num: i,
          end_date: trainingProgramNameEndDate,
          day_name: trainingProgramDays[i].day_name,
          day_description: trainingProgramDays[i].day_description
        }
      });
    }
  }
};
async function loadTraining(date) {
  var trainingData = await prisma.trainingProgram.findFirst({
    where: {
      user_id: user.name,
      end_date: {
        gte: new Date(date)
      }
    },
    // include the training days for the training program
    include: {
      training_days: true
    }
  });
  return trainingData;
}
export {
  actions,
  load
};
