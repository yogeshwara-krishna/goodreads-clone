import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "../../../types/database.types";
import BubbleWrap from "../login/BubbleWrap";

export default async function Unauthenticated() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <p>Please sign in to see todos!</p>
    </>
  );
}
