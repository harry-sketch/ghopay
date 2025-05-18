import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  goPoints: publicProcedure
    .input(z.object({ gpoints: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { gpoints, email } = input;

        await ctx.db
          .update(Users)
          .set({ gpoints })
          .where(eq(Users.email, email));
      } catch (error) {
        console.log({ error });

        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    }),
});
