import { clerkClient } from "@clerk/nextjs/server";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// const filterUserforClient = (user: User) => {
//   return {
//     id: user.id,
//     username: user.username,
//     profilePicture: user.profileImageUrl,
//   };
// };

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });

    const users = await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100,
    });

    return posts;
  }),
});
