import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Transactions } from "../../db/schema";

export const transactionRouter = createTRPCRouter({
  sendTransaction: publicProcedure
    .input(
      z.object({
        amount: z.string(),
        to: z.string(),
        from: z.string(),
        transactionHash: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { amount, from, to, transactionHash, email } = input;

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

  allTransactions: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { address } = input;

        const userId = await ctx.db.query.Users.findFirst({
          where: (s, { eq }) => eq(s.walletAddress, address),
          columns: {
            id: true,
          },
        });

        console.log({ userId });

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

        console.log({ allTransactions });

        return allTransactions;
      } catch (error) {
        console.log({ error });
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    }),
});
