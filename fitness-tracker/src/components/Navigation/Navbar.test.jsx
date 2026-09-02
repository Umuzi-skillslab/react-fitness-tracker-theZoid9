import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Navbar from "./Navbar";

afterEach(() => {
  cleanup();
});

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("FitTracker")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Exercises")).toBeInTheDocument();
    expect(screen.getByText("Planner")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();
  });

  it("highlights the active route", () => {
    render(
      <MemoryRouter initialEntries={["/exercises"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Exercises").className).toContain(
      "active"
    );
  });

  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button = screen.getByLabelText("Toggle navigation menu");

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu when a link is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button = screen.getByLabelText("Toggle navigation menu");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByText("Exercises"));

    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});