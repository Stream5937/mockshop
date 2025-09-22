import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../utils/renderWithRouter.jsx";
import ErrorPage from "../../src/components/ErrorPage.jsx";

//to test the test process!
describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("Error page component", () => {
  it("renders", () => {
    const { asFragment } = renderWithRouter(<ErrorPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders text", () => {
    renderWithRouter(<ErrorPage />);
    expect(screen.getByRole("heading").textContent).toMatch(
      /Oh no, this route doesn't exist!/i
    );
  });
});
