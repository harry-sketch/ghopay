import React from "react";
import History from "../_components/History/History";
import { auth } from "../../server/lib/server-utils";
import { redirect } from "next/navigation";

const page = async () => {
  const authn = await auth();

  if (!authn) return redirect("/login");

  return <History />;
};

export default page;
