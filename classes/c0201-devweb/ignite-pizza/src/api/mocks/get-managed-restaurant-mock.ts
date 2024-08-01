import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from "@/api/get-managed-restaurant.ts";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json<GetManagedRestaurantResponse>({
    id: "1",
    managerId: "1",
    name: "Pizza Shop",
    createdAt: new Date(),
    description: "Pizza Shop",
    updatedAt: new Date(),
  });
});
