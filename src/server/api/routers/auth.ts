import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Users } from "../../db/schema";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        walletAddress: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existingUser = await ctx.db.query.Users.findFirst({
          where: (users, { eq, or }) =>
            or(
              eq(users.email, input.email),
              eq(users.walletAddress, input.walletAddress),
            ),
        });

        if (!existingUser) {
          const user = {
            email: input.email,
            walletAddress: input.walletAddress,
          };

          await ctx.db.insert(Users).values(user).onConflictDoNothing();
        }
      } catch (error) {
        console.log({ error });
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error instanceof Error ? error.message : String(error),
          message: "Failed to create user",
        });
      }
    }),
});
