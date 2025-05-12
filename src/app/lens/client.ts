/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PublicClient, mainnet } from "@lens-protocol/client";

import { fragments } from "./fragments";
import { fetchAccount } from "@lens-protocol/client/actions";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export const lensclient = PublicClient.create({
  environment: mainnet,
  fragments,
  apiKey: "uzNk4Y-62-OIY_kIWuj25fZ7dU84-TqZ9i",
});

export const getAuthenticatedAccount = async () => {
  if (!lensclient.isSessionClient()) {
    return null;
  }

  const authenticatedUser = lensclient.getAuthenticatedUser().unwrapOr(null);
  if (!authenticatedUser) {
    return null;
  }

  return fetchAccount(lensclient, {
    address: authenticatedUser.address,
  }).unwrapOr(null);
};
