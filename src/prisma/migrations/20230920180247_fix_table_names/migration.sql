/*
  Warnings:

  - You are about to drop the `designation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `highlight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "designation" DROP CONSTRAINT "designation_id_fkey";

-- DropForeignKey
ALTER TABLE "highlight" DROP CONSTRAINT "highlight_userid_fkey";

-- DropTable
DROP TABLE "designation";

-- DropTable
DROP TABLE "highlight";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Designation" (
    "id" SERIAL NOT NULL,
    "type" "highlight_type" NOT NULL,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id","type")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" SERIAL NOT NULL,
    "userid" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "content" VARCHAR(255) NOT NULL,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "display_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_id_fkey" FOREIGN KEY ("id") REFERENCES "Highlight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
