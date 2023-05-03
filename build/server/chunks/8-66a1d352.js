import { PrismaClient } from '@prisma/client';
import { u as user } from './stores-b6011d9d.js';
import { T as TrainingSmartAIThingie } from './SmartAIThingie-92ddd1ac.js';
import './index2-4f7f68c2.js';
import './index3-d06080d5.js';
import './index-36410280.js';
import 'dotenv';

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

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
const component = async () => (await import('./_page.svelte-5bf674db.js')).default;
const file = '_app/immutable/components/pages/traininglog/_date_/_page.svelte-ef58a016.js';
const imports = ["_app/immutable/components/pages/traininglog/_date_/_page.svelte-ef58a016.js","_app/immutable/chunks/index-188eb586.js","_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang-146fd073.js"];
const stylesheets = ["_app/immutable/assets/_page-00f3fc8b.css","_app/immutable/assets/ArrowUp-d004936d.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, stylesheets };
//# sourceMappingURL=8-66a1d352.js.map
