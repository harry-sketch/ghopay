import "server-only";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { env } from "~/env";

export const TOKEN_COOKIE = "__GHOPAY_TOKEN__";

type TokenPayload = {
  email: string;
  userId: number;
  walletAddress: string;
};

export const auth = async () => {
  const c = await cookies();

  const token = c.get(TOKEN_COOKIE)?.value;

  if (!token) return null;

  try {
    const data = jwt.verify(token, env.JWT_SECRET) as TokenPayload;

    return data;
  } catch (error) {
    console.error("error verifying token", error);
    c.delete(TOKEN_COOKIE);

    return null;
  }
};

export const createAndSetToken = async (data: TokenPayload) => {
  const c = await cookies();

  const j = jwt.sign(
    {
      email: data.email,
      userId: data.userId,
      walletAddress: data.walletAddress,
    },
    env.JWT_SECRET,
    {
      expiresIn: "100d",
    },
  );

  c.set(TOKEN_COOKIE, j);
};
