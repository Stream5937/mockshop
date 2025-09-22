import { describe, it, expect, vi, beforeEach } from "vitest";
import { page, screen } from "@testing-library/react";
import { renderWithRouter } from "../utils/renderWithRouter.jsx";
import Cart from "../../src/components/Cart.jsx";

vi.mock("react-router-dom", async () => {
  //mock totals
  let mockQuantity = 3;
  let mockTotalItems = 3;
  let mockTotalCost = 30;

  const mod = await vi.importActual("react-router-dom");

  const mockProduct = {
    id: 1,
    title: "Test Product",
    category: "Test Category",
    price: 10,
    description: "This is a test product description",
    rating: { rate: 4.5, count: 20 },
    image: "test.jpg",
    the_alt_text: "Test Product",
  };

  const mockContext = [
    { products: [mockProduct], error: null, loading: false }, // context[0]
    [[{ item: mockProduct, number: 1 }], vi.fn()], // context[1]
    [vi.fn(), vi.fn(), vi.fn()], // context[2]
    [mockQuantity, vi.fn()], // context[3]
    [mockTotalItems, vi.fn()], //context[4];
    [mockTotalCost, vi.fn()], //context[5]
  ];

  return {
    ...mod,
    useOutletContext: () => mockContext, // return array
  };
});

describe("Cart component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders", () => {
    const { asFragment } = renderWithRouter(<Cart />);
    expect(asFragment()).toMatchSnapshot();
  });

  /*
  //single item cart
  it("single product cart", () => {
    const testid = renderWithRouter(<Cart />);
    expect(testid("testImg").toBeInTheDocument);
    //expect(screen.getByRole("img").name.toMatch("test.jpg"));
  });
  */

  it("uses correct img src", async () => {
    const { getByAltText } = await renderWithRouter(<Cart />);

    const image = getByAltText("Test Product");

    // expect(image.src).toContain("the_url");
    // or
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  //cart total items
  it("with three item cart: renders text", () => {
    renderWithRouter(<Cart />);
    expect(screen.getByRole("heading").textContent).toMatch(
      "🛒 Mini Cart (total items 3)"
    );
    expect(screen.getByText("Current Total to Pay: $30"));
  });
});
