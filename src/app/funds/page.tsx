import { redirect } from "next/navigation";
import { auth } from "../../server/lib/server-utils";
import Funds from "../_components/Funds/Funds";

const Page = async () => {
  const gg = await auth();

  if (!gg) return redirect("/login");

  return <Funds address={gg.walletAddress} />;
};

export default Page;
