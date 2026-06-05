import { cookies } from "next/headers";

export type AppMode = "demo" | "dev";

/** Reads the current display mode from the cookie. Defaults to "demo". */
export async function getMode(): Promise<AppMode> {
  const store = await cookies();
  return store.get("pj_mode")?.value === "dev" ? "dev" : "demo";
}
