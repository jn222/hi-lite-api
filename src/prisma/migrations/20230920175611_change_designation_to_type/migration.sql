/*
  Warnings:

  - The primary key for the `designation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `designation` on the `designation` table. All the data in the column will be lost.
  - Added the required column `type` to the `designation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "designation" DROP CONSTRAINT "designation_pkey",
DROP COLUMN "designation",
ADD COLUMN     "type" "highlight_type" NOT NULL,
ADD CONSTRAINT "designation_pkey" PRIMARY KEY ("id", "type");
