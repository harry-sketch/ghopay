import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { GhoPoints } from "../../db/schema";

export const goPointsRouter = createTRPCRouter({
  goPoints: publicProcedure
    .input(
      z.object({
        gplabel: z.enum(["referral", "transaction"]),
        gpoints: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, gplabel, gpoints } = input;

        const userId = await ctx.db.query.Users.findFirst({
          where: (s, { eq }) => eq(s.email, email),
          columns: {
            id: true,
          },
        });

        if (!userId?.id) return;

        const val = {
          gpoints,
          gplabel,
          userId: userId.id,
        };

        await ctx.db.insert(GhoPoints).values(val).onConflictDoNothing();
      } catch (error) {
        console.log({ error });

        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    }),

  gData: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { address } = input;

        const points = await ctx.db.query.Users.findFirst({
          where: (s, { eq }) => eq(s.walletAddress, address),
          columns: {
            gpoints: true,
          },
        });

        if (!points?.gpoints) return;

        return Number(points?.gpoints ?? 0);
      } catch (error) {
        console.log({ error });
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    }),
});
