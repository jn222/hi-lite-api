/*
  Warnings:

  - You are about to drop the column `designation` on the `highlight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "highlight" DROP COLUMN "designation";

-- CreateTable
CREATE TABLE "designation" (
    "id" SERIAL NOT NULL,
    "designation" "highlight_type" NOT NULL,

    CONSTRAINT "designation_pkey" PRIMARY KEY ("id","designation")
);

-- AddForeignKey
ALTER TABLE "designation" ADD CONSTRAINT "designation_id_fkey" FOREIGN KEY ("id") REFERENCES "highlight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
