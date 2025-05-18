import Home from "~/app/_components/Home/Home";
import { auth } from "../server/lib/server-utils";

export default async function Page() {
  const test = await auth();

  console.log({ test });

  return <Home />;
}
