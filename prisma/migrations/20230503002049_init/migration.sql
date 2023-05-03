-- CreateTable
CREATE TABLE "FoodLog" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "food_name" TEXT NOT NULL,
    "food_qty" DOUBLE PRECISION NOT NULL,
    "protein_grams" DOUBLE PRECISION NOT NULL,
    "fat_grams" DOUBLE PRECISION NOT NULL,
    "carbs_grams" DOUBLE PRECISION NOT NULL,
    "kkcals" DOUBLE PRECISION NOT NULL,
    "feeding_date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodReference" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "food_name" TEXT NOT NULL,
    "food_qty" DOUBLE PRECISION NOT NULL,
    "protein_grams" DOUBLE PRECISION NOT NULL,
    "fat_grams" DOUBLE PRECISION NOT NULL,
    "carbs_grams" DOUBLE PRECISION NOT NULL,
    "kkcals" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageBase64" TEXT NOT NULL,

    CONSTRAINT "FoodReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetTotals" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "feeding_date" TEXT NOT NULL,
    "fat_grams" DOUBLE PRECISION NOT NULL,
    "carbs_grams" DOUBLE PRECISION NOT NULL,
    "protein_grams" DOUBLE PRECISION NOT NULL,
    "kcals" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "TargetTotals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingProgram" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "program_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainingProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingProgramDay" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "day_name" TEXT NOT NULL,
    "day_description" TEXT NOT NULL,
    "day_order_num" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "program_id" TEXT NOT NULL,

    CONSTRAINT "TrainingProgramDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingProgramDayExercise" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "program_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "program_day_id" TEXT NOT NULL,

    CONSTRAINT "TrainingProgramDayExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingProgramDayLog" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "program_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "program_day_id" TEXT NOT NULL,

    CONSTRAINT "TrainingProgramDayLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrainingProgramDay_program_id_idx" ON "TrainingProgramDay"("program_id");

-- CreateIndex
CREATE INDEX "TrainingProgramDayExercise_program_day_id_idx" ON "TrainingProgramDayExercise"("program_day_id");

-- CreateIndex
CREATE INDEX "TrainingProgramDayLog_program_day_id_idx" ON "TrainingProgramDayLog"("program_day_id");

-- AddForeignKey
ALTER TABLE "TrainingProgramDay" ADD CONSTRAINT "TrainingProgramDay_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "TrainingProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingProgramDayExercise" ADD CONSTRAINT "TrainingProgramDayExercise_program_day_id_fkey" FOREIGN KEY ("program_day_id") REFERENCES "TrainingProgramDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingProgramDayLog" ADD CONSTRAINT "TrainingProgramDayLog_program_day_id_fkey" FOREIGN KEY ("program_day_id") REFERENCES "TrainingProgramDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
