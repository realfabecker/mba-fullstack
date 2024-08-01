import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OrderStatus } from "@/components/OrderStatus.tsx";

describe("OrderStatus", () => {
  it("should display the right text when order status is pending", async () => {
    // pending
    const wrapper = render(<OrderStatus status={"pending"} />);
    const statusText = wrapper.getByText("Pendente");
    const badgeElem = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElem).toHaveClass("bg-slate-400");
  });
  it("should display the right text when order status is canceled", async () => {
    // pending
    const wrapper = render(<OrderStatus status={"canceled"} />);
    const statusText = wrapper.getByText("Cancelado");
    const badgeElem = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElem).toHaveClass("bg-rose-500");
  });
  it("should display the right text when order status is processing", async () => {
    // pending
    const wrapper = render(<OrderStatus status={"processing"} />);
    const statusText = wrapper.getByText("Em preparo");
    const badgeElem = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElem).toHaveClass("bg-amber-500");
  });
  it("should display the right text when order status is delivering", async () => {
    // pending
    const wrapper = render(<OrderStatus status={"delivering"} />);
    const statusText = wrapper.getByText("Em entrega");
    const badgeElem = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElem).toHaveClass("bg-amber-500");
  });
  it("should display the right text when order status is delivered", async () => {
    // pending
    const wrapper = render(<OrderStatus status={"delivered"} />);
    const statusText = wrapper.getByText("Entregue");
    const badgeElem = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElem).toHaveClass("bg-emerald-500");
  });
});
