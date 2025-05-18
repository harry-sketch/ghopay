import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Users } from "../../db/schema";
import { z } from "zod";
import { createAndSetToken, TOKEN_COOKIE } from "../../lib/server-utils";
import { cookies } from "next/headers";

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

        const user = await ctx.db.query.Users.findFirst({
          where: (s, { eq }) => eq(s.email, input.email),
        });

        console.log({ user });

        if (!user)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "User not found after creation",
          });

        await createAndSetToken({
          email: input.email,
          userId: user.id,
        });

        return true;
      } catch (error) {
        console.log({ error });
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error instanceof Error ? error.message : String(error),
          message: "Failed to create user",
        });
      }
    }),

  logout: publicProcedure.mutation(async () => {
    const c = await cookies();
    c.delete(TOKEN_COOKIE);

    return;
  }),

  session: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
