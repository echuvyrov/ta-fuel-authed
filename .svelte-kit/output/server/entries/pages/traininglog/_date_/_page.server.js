import { PrismaClient } from "@prisma/client";
import { u as user } from "../../../../chunks/stores.js";
import { T as TrainingSmartAIThingie } from "../../../../chunks/SmartAIThingie.js";
const prisma = new PrismaClient();
var forDate = "";
var exercises = [];
var selectedDayId = "";
var selectedDayDescription = "";
const load = async ({ params }) => {
  loadExercises();
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
    exerciseReferences: exercises,
    selectedDayId,
    selectedDayDescription
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
          day_description: trainingProgramDays[i].day_description,
          training_grid: []
        }
      });
    }
  },
  addexercise: async ({ request, cookies }) => {
    const data = await request.formData();
    let dayId = data.get("day_id") || "";
    let exerciseName = data.get("exercise_name");
    let exerciseDate = data.get("exercise_date");
    let trainingGridInsertionIndex = 0;
    const exerciseLoad = data.get("exercise_load");
    const exerciseReps = data.get("exercise_reps");
    const exerciseNotes = data.get("exercise_notes");
    let exerciseValue = exerciseLoad;
    if (exerciseReps != null && exerciseReps != "") {
      exerciseValue += " x " + exerciseReps;
    }
    if (exerciseNotes != null && exerciseNotes != "") {
      exerciseValue += " (" + exerciseNotes + ")";
    }
    const exerciseReference = await prisma.exerciseReference.findFirst({
      where: {
        user_id: user.name,
        exercise_name: exerciseName
      }
    });
    if (exerciseReference == null) {
      await prisma.exerciseReference.create({
        data: {
          exercise_name: exerciseName,
          user_id: user.name
        }
      });
      loadExercises();
    }
    if (exerciseName.includes("cmd")) {
      const command = exerciseName.split("cmd")[1].toLowerCase();
      switch (command.trim()) {
        case "count kcals for the day":
          const kcalsBurned = await getKcalsForDay(command, dayId, exerciseDate);
          exerciseName = "Total kcals burned";
          exerciseValue = kcalsBurned;
      }
    }
    if (dayId == 0) {
      var currentDate = new Date();
      var endProgramDate = new Date();
      endProgramDate.setFullYear(currentDate.getFullYear() + 5);
      const newTrainingProgram = await prisma.trainingProgram.create({
        data: {
          user_id: user.name,
          program_name: "Training kicked off " + new Date().toLocaleDateString(),
          // set end date to be 5 years from now
          end_date: endProgramDate.toISOString()
        }
      });
      const dayDescription = "Training on " + exerciseDate.toString();
      let gridRow = [{ "exercise": exerciseName, [exerciseDate]: exerciseValue }];
      const newTrainingDay = await prisma.trainingProgramDay.create({
        data: {
          user_id: user.name,
          day_name: exerciseDate.toString(),
          day_description: dayDescription,
          day_order_num: 0,
          end_date: endProgramDate.toISOString(),
          training_grid: gridRow,
          program: {
            connect: {
              id: newTrainingProgram.id
            }
          }
        }
      });
      dayId = newTrainingDay.id;
      selectedDayDescription = dayDescription;
    } else {
      const trainingDay = await prisma.trainingProgramDay.findUnique({
        where: {
          id: dayId
        }
      });
      var trainingGrid = trainingDay.training_grid;
      let exerciseUpdated = false;
      for (var i = 0; i < trainingGrid.length; i++) {
        if (trainingGrid[i].exercise == exerciseName) {
          if (!trainingGrid[i][exerciseDate]) {
            trainingGrid[i][exerciseDate] = exerciseValue;
            exerciseUpdated = true;
            trainingGridInsertionIndex = i;
            break;
          }
        }
      }
      if (!exerciseUpdated) {
        trainingGridInsertionIndex = trainingGrid.length;
        trainingGrid.push({ "exercise": exerciseName, [exerciseDate]: exerciseValue });
      }
      for (var i = 0; i < trainingGrid.length; i++) {
        if (trainingGrid[i][exerciseDate] == null && trainingGridInsertionIndex > i) {
          trainingGrid.splice(i, 0, trainingGrid.splice(trainingGridInsertionIndex, 1)[0]);
          break;
        }
      }
      const updatedTrainingDay = await prisma.trainingProgramDay.update({
        where: {
          id: dayId
        },
        data: {
          training_grid: trainingGrid
        }
      });
      selectedDayDescription = updatedTrainingDay.day_description;
    }
    selectedDayId = dayId;
  }
};
async function loadTraining(forDate2) {
  var trainingData = await prisma.trainingProgram.findFirst({
    where: {
      user_id: user.name,
      end_date: {
        gte: new Date(forDate2)
      }
    },
    // include the training days for the training program
    include: {
      training_days: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return trainingData;
}
async function getKcalsForDay(command, dayId, exerciseDate) {
  const trainingDay = await prisma.trainingProgramDay.findUnique({
    where: {
      id: dayId
    }
  });
  var trainingGrid = trainingDay.training_grid;
  var exerciseNameValue = "";
  for (var i = 0; i < trainingGrid.length; i++) {
    if (trainingGrid[i][exerciseDate]) {
      var exerciseName = trainingGrid[i].exercise;
      var exerciseValue = trainingGrid[i][exerciseDate];
      exerciseNameValue = exerciseNameValue + exerciseName + " " + exerciseValue + "\n";
    }
  }
  var kcalsForDay = await TrainingSmartAIThingie.askForActivityKCals(exerciseNameValue);
  return kcalsForDay;
}
async function loadExercises() {
  exercises = await prisma.exerciseReference.findMany({
    // select everything except the image
    select: {
      exercise_name: true,
      user_id: true,
      id: true
    },
    where: {
      user_id: user.name
    },
    orderBy: {
      exercise_name: "asc"
    }
  });
}
export {
  actions,
  load
};
