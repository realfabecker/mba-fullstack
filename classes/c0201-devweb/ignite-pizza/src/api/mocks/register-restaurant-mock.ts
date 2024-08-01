import { http, HttpResponse } from "msw";
import { RegisterRestaurantInBody } from "@/api/register-restaurant.ts";

export const registerRestaurantMock = http.post<
  never,
  RegisterRestaurantInBody
>("/restaurants", async ({ request }) => {
  const { restaurantName } = await request.json();
  if (restaurantName === "Pizza Shop") {
    return new HttpResponse(null, { status: 201 });
  }
  return new HttpResponse(null, { status: 400 });
});
