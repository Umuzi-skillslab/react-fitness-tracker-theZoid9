import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick}>
        Click me
      </Button>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Click me" })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports variants and sizes", () => {
    render(
      <Button variant="danger" size="large">
        Delete
      </Button>
    );

    const button = screen.getByRole("button", {
      name: "Delete",
    });

    expect(button.className).toContain("danger");
    expect(button.className).toContain("large");
  });

  it("can be disabled", () => {
    render(
      <Button disabled>
        Submit
      </Button>
    );

    expect(
      screen.getByRole("button", { name: "Submit" })
    ).toBeDisabled();
  });

  it("supports button type", () => {
    render(
      <Button type="submit">
        Submit
      </Button>
    );

    expect(
      screen.getByRole("button", { name: "Submit" })
    ).toHaveAttribute("type", "submit");
  });
});