-- CreateTable
CREATE TABLE "Weather" (
    "id" TEXT NOT NULL,
    "cityname" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "weather_description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
