import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import * as reactRouterDom from "react-router-dom";
import { renderWithRouter } from "../utils/renderWithRouter.jsx";
import Root from "../../src/components/Root";

// ----- Mocking react-router-dom hooks -----
const useLoaderData = vi.spyOn(reactRouterDom, "useLoaderData");
const useNavigation = vi.spyOn(reactRouterDom, "useNavigation");

describe("Root component", () => {
  const mockClearCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders correct text in h2 element", () => {
    useLoaderData.mockReturnValue({
      products: [{ category: "Test Category" }],
    });
    useNavigation.mockReturnValue({ state: "idle" });

    renderWithRouter(<Root clearCart={mockClearCart} />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Categories"
    );
  });

  test("renders Home Page and Your Cart links", () => {
    useLoaderData.mockReturnValue({ products: [] });
    useNavigation.mockReturnValue({ state: "idle" });

    renderWithRouter(<Root clearCart={mockClearCart} />);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  test("renders category links from products", () => {
    useLoaderData.mockReturnValue({
      products: [{ category: "Test Category" }],
    });
    useNavigation.mockReturnValue({ state: "idle" });

    renderWithRouter(<Root clearCart={mockClearCart} />);

    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Test Category" })).toHaveAttribute(
      "href",
      "/category/Test Category"
    );
  });

  test("renders Clear Selection and Clear Cart buttons", () => {
    useLoaderData.mockReturnValue({ products: [] });
    useNavigation.mockReturnValue({ state: "idle" });

    renderWithRouter(<Root clearCart={mockClearCart} />);

    expect(screen.getByText("Clear Selection")).toBeInTheDocument();
    expect(screen.getByText("Clear Cart")).toBeInTheDocument();
  });

  test("calls clearCart when Clear Cart button is clicked", () => {
    useLoaderData.mockReturnValue({ products: [] });
    useNavigation.mockReturnValue({ state: "idle" });

    window.prompt = vi.fn().mockReturnValue(true);

    renderWithRouter(<Root clearCart={mockClearCart} />);

    fireEvent.click(screen.getByText("Clear Cart"));
    expect(mockClearCart).toHaveBeenCalled();
  });

  test("shows loading message when navigation is loading", () => {
    useLoaderData.mockReturnValue({ products: [] });
    useNavigation.mockReturnValue({ state: "loading" });

    renderWithRouter(<Root clearCart={mockClearCart} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows error message when loader throws", () => {
    useLoaderData.mockImplementation(() => {
      throw new Error("Failed to fetch");
    });
    useNavigation.mockReturnValue({ state: "idle" });

    renderWithRouter(<Root clearCart={mockClearCart} />);

    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });
});
