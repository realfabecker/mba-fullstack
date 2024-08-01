import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { NavLink } from "@/components/NavLink.tsx";
import { MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
  it("should highlight the nav link when it is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/home">Home</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      },
    );
    expect(wrapper.getByText("Home").dataset.current).eql("false");
    expect(wrapper.getByText("About").dataset.current).eql("true");
  });
});
