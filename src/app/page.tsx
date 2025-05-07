import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const client = createThirdwebClient({
    clientId: "11061b92f667a9945df17ac608a2e196",
  });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        GHO pAy
        <ConnectButton client={client} />
      </main>
    </HydrateClient>
  );
}
