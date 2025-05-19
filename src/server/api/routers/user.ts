import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  goPoints: protectedProcedure
    .input(z.object({ gpoints: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { gpoints } = input;

        const { email } = ctx.user;

        const userId = await ctx.db.query.Users.findFirst({
          where: (s, { eq }) => eq(s.email, email),
          columns: {
            gpoints: true,
          },
        });

        if (!userId) return;

        const totalPoints = Number(userId.gpoints) + Number(gpoints);

        await ctx.db
          .update(Users)
          .set({ gpoints: String(totalPoints) })
          .where(eq(Users.email, email));
      } catch (error) {
        console.log({ error });

        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    }),
});
