import { redirect } from "next/navigation";
import { auth } from "../../../server/lib/server-utils";
import Payment from "../../_components/Payment/Payment";

export type Params = Promise<{ name: string }>;

const PayName = async ({ params }: { params: Params }) => {
  const gg = await auth();

  if (!gg) return redirect("/login");

  return <Payment params={params} walletAddress={gg.walletAddress} />;
};

export default PayName;
