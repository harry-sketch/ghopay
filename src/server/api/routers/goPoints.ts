import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { GhoPoints } from "../../db/schema";

export const goPointsRouter = createTRPCRouter({
  goPoints: protectedProcedure
    .input(
      z.object({
        gplabel: z.enum(["referral", "transaction"]),
        gpoints: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { gplabel, gpoints } = input;

        const { email } = ctx.user;

        const userId = await ctx.db.query.Users.findFirst({
          where: (s, { eq }) => eq(s.email, email),
          columns: {
            id: true,
          },
        });

        if (!userId) return;

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

  gData: protectedProcedure.query(async ({ ctx }) => {
    try {
      const { walletAddress } = ctx.user;
      const points = await ctx.db.query.Users.findFirst({
        where: (s, { eq }) => eq(s.walletAddress, walletAddress),
        columns: {
          gpoints: true,
        },
      });

      if (!points) return;

      return Number(points.gpoints) ?? 0;
    } catch (error) {
      console.log({ error });
      throw new TRPCError({
        code: "BAD_REQUEST",
      });
    }
  }),
});
