import { api } from "@/lib/axios.ts";

export interface GetManagedRestaurantResponse {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string;
  managerId: string;
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    "/managed-restaurant",
  );
  return response.data;
}
