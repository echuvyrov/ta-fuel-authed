import { PrismaClient } from "@prisma/client";
import { u as user } from "../../../../../chunks/stores.js";
import "../../../../../chunks/SmartAIThingie.js";
const prisma = new PrismaClient();
var currDate = "";
var exercises = [];
var selectedDayId = "";
var selectedDayDescription = "";
var nickname = "name";
const load = async ({ params }) => {
  if (!params.date) {
    currDate = getLocalDate();
  } else {
    currDate = params.date;
  }
  if (!params.nickname)
    ;
  else {
    nickname = params.nickname;
  }
  var currentTrainingProgramDays = await loadTraining(currDate);
  if (currentTrainingProgramDays == null) {
    currentTrainingProgramDays = { training_days: [] };
  } else {
    currentTrainingProgramDays.training_days.sort((a, b) => a.day_order_num > b.day_order_num ? 1 : -1);
  }
  return {
    trainingProgamDays: currentTrainingProgramDays,
    exerciseReferences: exercises,
    selectedDayId,
    selectedDayDescription,
    today: currDate,
    nickname
  };
};
async function loadTraining(forDate) {
  var trainingData = await prisma.trainingProgram.findFirst({
    where: {
      user_id: user.name,
      end_date: {
        gte: new Date(forDate)
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
function getLocalDate() {
  const currentDate = /* @__PURE__ */ new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const datePortion = `${year}-${month}-${day}`;
  return datePortion;
}
export {
  load
};
