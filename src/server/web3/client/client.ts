import { createThirdwebClient } from "thirdweb";
import { env } from "~/env";

const clientId = env.NEXT_PUBLIC_THIRDWEB_CLIENT;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
