// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  pgTableCreator,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const referralStatusEnum = pgEnum("referral_status", [
  "PENDING",
  "ONBOARDED",
]);

export const gPointsEnum = pgEnum("gpoints_label", ["transaction", "referral"]);

export const createTable = pgTableCreator((name) => `${name}`);

export const Users = createTable("user", {
  id: serial().primaryKey(),
  email: text(),
  lens: text(),
  walletAddress: text().notNull(),
  gpoints: integer().default(0),
  referredBy: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});

export const Referral = createTable("referral", {
  id: serial().primaryKey(),
  refereeLensId: text().notNull().unique(),
  referrerUserId: integer()
    .notNull()
    .references(() => Users.id),
  status: referralStatusEnum("referral_status").default("PENDING").notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});

export const Transactions = createTable("transactions", {
  id: serial().primaryKey(),
  transactionUserId: integer()
    .notNull()
    .references(() => Users.id),
  amount: text(),
  transactionTo: text().notNull(),
  transactionFrom: text().notNull(),
  transactionHash: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});

export const GhoPoints = createTable("ghoPoints", {
  id: serial().primaryKey(),
  gpoints: integer().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
  gplabel: gPointsEnum("gpoints_label"),
  userId: integer()
    .notNull()
    .references(() => Users.id),
});
