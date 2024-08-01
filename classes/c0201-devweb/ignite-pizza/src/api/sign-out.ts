import { api } from "@/lib/axios.ts";

export async function signOut() {
  api.post("/sign-out");
}
