"use server";

import { createClient } from "@/lib/supabase/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export async function createOperatorApplication(input: {
  company_name: FormDataEntryValue | null;
  fleet_size: number;
  momo_number: FormDataEntryValue | null;
  routes: FormDataEntryValue | null;
}) {
  try {
    const user = await getLoggedInUser();
    if (!user) return { error: "Unauthorized" as const };

    const supabase = await createClient();

    const { error } = await supabase.from("operators").insert({
      user_id: user.id,
      company_name: input.company_name,
      fleet_size: input.fleet_size,
      momo_number: input.momo_number,
      routes: input.routes,
      status: "pending",
    });

    if (error) return { error: error.message as const };
    return { success: true as const };
  } catch (error) {
    console.error("createOperatorApplication error:", error);
    return { error: "Application failed" as const };
  }
}
