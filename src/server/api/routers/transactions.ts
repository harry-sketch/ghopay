import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Transactions } from "../../db/schema";

export const transactionRouter = createTRPCRouter({
  sendTransaction: protectedProcedure
    .input(
      z.object({
        amount: z.string(),
        to: z.string(),
        from: z.string(),
        transactionHash: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { amount, from, to, transactionHash } = input;

        const { email } = ctx.user;

        const userId = await ctx.db.query.Users.findFirst({
          where: (s, { eq }) => eq(s.email, email),
          columns: {
            id: true,
          },
        });

        if (!userId) return;

        const transaction = {
          transactionUserId: userId.id,
          amount,
          transactionTo: to,
          transactionFrom: from,
          transactionHash,
        };

        const transactionData = await ctx.db
          .insert(Transactions)
          .values(transaction)
          .onConflictDoNothing();

        console.log({ transactionData });

        return transactionData;
      } catch (error) {
        console.log({ error });
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    }),

  allTransactions: protectedProcedure.query(async ({ ctx }) => {
    try {
      const { walletAddress } = ctx.user;
      const userId = await ctx.db.query.Users.findFirst({
        where: (s, { eq }) => eq(s.walletAddress, walletAddress),
        columns: {
          id: true,
        },
      });

      if (!userId?.id) return;

      const allTransactions = await ctx.db.query.Transactions.findMany({
        where: (s, { eq }) => eq(s.transactionUserId, userId.id),
        columns: {
          amount: true,
          id: true,
          transactionHash: true,
          transactionTo: true,
        },
      });

      return allTransactions;
    } catch (error) {
      console.log({ error });
      throw new TRPCError({
        code: "BAD_REQUEST",
      });
    }
  }),
});
