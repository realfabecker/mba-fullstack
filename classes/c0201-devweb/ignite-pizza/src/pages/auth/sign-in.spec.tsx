import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SignIn } from "@/pages/auth/sign-in.tsx";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query.ts";
import { HelmetProvider } from "react-helmet-async";

describe("SignIn", () => {
  it("should set default email input value if email  is present on search params", () => {
    const wrapper = render(
      <>
        <SignIn />
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <HelmetProvider>
              <MemoryRouter
                initialEntries={["/sign-in?email=johndoe@sample.com"]}
              >
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </MemoryRouter>
            </HelmetProvider>
          );
        },
      },
    );
    const emailInput = wrapper.getByLabelText("Seu e-mail");
    expect(emailInput.value).eql("johndoe@sample.com");
  });
});
