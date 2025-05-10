/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { FragmentOf } from "@lens-protocol/client";

import { AccountFragment, type AccountMetadataFragment } from "./accounts";

declare module "@lens-protocol/client" {
  export interface Account extends FragmentOf<typeof AccountFragment> {}
  export interface AccountMetadata
    extends FragmentOf<typeof AccountMetadataFragment> {}
}

export const fragments = [AccountFragment];
