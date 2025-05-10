/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PublicClient, mainnet } from "@lens-protocol/client";

import { fragments } from "./fragments";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export const lensclient = PublicClient.create({
  environment: mainnet,
  fragments,
});
