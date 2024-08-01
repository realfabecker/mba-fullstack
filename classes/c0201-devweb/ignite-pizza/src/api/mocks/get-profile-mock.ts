import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "@/api/get-profile.ts";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json<GetProfileResponse>({
      id: "1",
      name: "John Doe",
      email: "johndoe@sample.com",
      phone: "47 9 1234 5678",
      createdAt: new Date(),
      role: "manager",
      updatedAt: new Date(),
    });
  },
);
