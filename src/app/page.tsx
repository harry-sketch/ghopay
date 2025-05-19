import Home from "~/app/_components/Home/Home";
import { auth } from "../server/lib/server-utils";
import { redirect } from "next/navigation";

export default async function Page() {
  const authentication = await auth();

  if (!authentication) redirect("/login");

  return <Home address={authentication.walletAddress} />;
}
