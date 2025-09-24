// tests/components/Root.test.jsx
import { describe, it, vi, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../utils/renderWithRouter";
import Root from "../../src/components/Root";
import Home from "../../src/components/Home";

// Mock useProducts hook
vi.mock("../../src/hooks/useProducts.jsx", () => {
  return {
    default: vi.fn(),
  };
});

import useProducts from "../../src/hooks/useProducts.jsx";

describe("Root component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    useProducts.mockReturnValue({
      products: null,
      error: null,
      loading: true,
    });

    renderWithRouter(<Root />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    useProducts.mockReturnValue({
      products: null,
      error: new Error("Failed to fetch"),
      loading: false,
    });

    renderWithRouter(<Root />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("renders categories when products are loaded", async () => {
    useProducts.mockReturnValue({
      products: [
        { id: 1, title: "Shirt", category: "Clothing", image: "img.png" },
        { id: 2, title: "Pants", category: "Clothing", image: "img.png" },
        { id: 3, title: "Laptop", category: "Electronics", image: "img.png" },
      ],
      error: null,
      loading: false,
    });

    renderWithRouter(<Root />);

    // Root renders categories sidebar
    expect(
      screen.getByRole("heading", { name: /categories/i })
    ).toBeInTheDocument();

    // Category links should be visible
    expect(screen.getByRole("link", { name: /clothing/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /electronics/i })
    ).toBeInTheDocument();
  });

  it("renders Home Page and Your Cart links", () => {
    renderWithRouter(<Root />);
    //screen.debug();
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  it("renders Clear Selection and Clear Cart buttons", () => {
    renderWithRouter(<Root />);
    // screen.debug();
    expect(screen.getByText("Clear Selection")).toBeInTheDocument();
    expect(screen.getByText("Clear Cart")).toBeInTheDocument();
  });

  it("calls clearCart when Clear Cart button is clicked", () => {
    renderWithRouter(<Root />);
    //screen.debug();
    window.prompt = vi.fn().mockReturnValue(true);
    const clearCartBtn = screen.getByText("Clear Cart");
    fireEvent.click(clearCartBtn);
    expect(window.prompt).toHaveBeenCalledWith("Confirm Delete Cart Contents", [
      false,
    ]);
  });

  it("passes products to Home via Outlet context", () => {
    useProducts.mockReturnValue({
      products: [
        {
          id: 1,
          title: "Shirt",
          category: "Clothing",
          image: "shirt.png",
          description: "Nice shirt",
        },
        {
          id: 2,
          title: "Laptop",
          category: "Electronics",
          image: "laptop.png",
          description: "Fast laptop",
        },
      ],
      error: null,
      loading: false,
    });

    renderWithRouter(null, {
      route: "/home",
      routes: [
        {
          path: "/",
          element: <Root />,
          children: [{ path: "home", element: <Home /> }],
        },
      ],
    });

    expect(
      screen.getByText(/mock shop this weeks promotions/i)
    ).toBeInTheDocument();
    //expect(screen.getByText(/Shirt/i)).toBeInTheDocument();  //does not distinguish between 'Shirt' and 'shirt'
    expect(screen.getByRole("heading", { name: "Shirt" })).toBeInTheDocument();
    expect(screen.getByText(/fast laptop/i)).toBeInTheDocument();
  });
});
