import { api } from "@/lib/axios.ts";

export interface RegisterRestaurantInBody {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantInBody) {
  await api.post("/restaurants", { restaurantName, managerName, email, phone });
}
