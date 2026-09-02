import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Card from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders a title", () => {
    render(
      <Card title="Workout">
        <p>Content</p>
      </Card>
    );

    expect(
      screen.getByRole("heading", { name: "Workout" })
    ).toBeInTheDocument();
  });

  it("applies a custom class", () => {
    render(
      <Card className="custom-card">
        Content
      </Card>
    );

    const card = screen.getByText("Content").closest(".custom-card");

    expect(card).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(
      <Card onClick={handleClick}>
        Content
      </Card>
    );

    fireEvent.click(
      screen.getByRole("button")
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick when Enter is pressed", () => {
    const handleClick = vi.fn();

    render(
      <Card onClick={handleClick}>
        Content
      </Card>
    );

    fireEvent.keyDown(screen.getByRole("button"), {
      key: "Enter",
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});