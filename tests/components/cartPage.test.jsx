import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../utils/renderWithRouter.jsx";
import CartPage from "../../src/components/CartPage.jsx";
import Cart from "../../src/components/Cart.jsx";

const mockProduct = {
  id: 1,
  title: "Test Product",
  category: "Test Category",
  price: 10,
  description: "This is a test product description",
  rating: { rate: 4.5, count: 20 },
  image: "test.jpg",
};

const mockQuantity = 3;
const mockTotalItems = 3;
const mockTotalCost = 30;

const defaultContext = [
  { products: [mockProduct], error: null, loading: false },
  [[{ item: mockProduct, number: 3 }], vi.fn()],
  [vi.fn(), vi.fn(), vi.fn()],
  [mockQuantity, vi.fn()],
  [mockTotalItems, vi.fn()],
  [mockTotalCost, vi.fn()],
];

// This variable will be used by the mock
let outletContext = defaultContext;

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useOutletContext: () => outletContext,
  };
});

describe("Cart Page component", () => {
  beforeEach(() => {
    outletContext = defaultContext;
  });

  it("renders", () => {
    const { asFragment } = renderWithRouter(<CartPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should find multiple h2 elements", () => {
    renderWithRouter(<CartPage />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent("MOCK SHOP CART DETAILS");
    expect(headings[1]).toHaveTextContent("🛒 Mini Cart (total items 3)");
  });

  it("renders Remove Item, Increase and Decrease buttons", () => {
    renderWithRouter(<CartPage />);
    expect(screen.getByRole("button", { name: /Remove/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Increase/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Decrease/i })
    ).toBeInTheDocument();
  });

  /*
  it("calls increase() when Increase Number is clicked", async () => {
    const increase = vi.fn();

    outletContext = [
      { products: [mockProduct], error: null, loading: false },
      [[{ item: mockProduct, number: 3 }], vi.fn()],
      [increase, vi.fn(), vi.fn()],
      [3, vi.fn()],
      [3, vi.fn()],
      [30, vi.fn()],
    ];

    renderWithRouter(<CartPage />);

    const increaseBtn = screen.getByRole("button", { name: /Increase/i });
    fireEvent.click(increaseBtn);

    const { default: CartDynamic } = await import(
      "../../src/components/Cart.jsx"
    );

    renderWithRouter(<CartDynamic />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    // expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent("MOCK SHOP CART DETAILS");
    expect(headings[1]).toHaveTextContent("🛒 Mini Cart (total items 4)");

    // expect(headings2[1]).toHaveTextContent("🛒 Mini Cart (total items 4)");
    //expect(increase).toHaveBeenCalledWith({ item: mockProduct, number: 3 });
    // Assert that the cart item quantity increased, or the UI updated
    //expect(screen.getAllByText(/4/)).toBeInTheDocument();
  });
  */
});
