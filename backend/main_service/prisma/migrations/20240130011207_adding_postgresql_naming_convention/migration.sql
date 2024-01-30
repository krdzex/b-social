/*
  Warnings:

  - You are about to drop the column `authorId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "authorId",
DROP COLUMN "postId",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Follow";

-- CreateTable
CREATE TABLE "follows" (
    "follower_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
