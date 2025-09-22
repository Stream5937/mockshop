import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithRouter } from "../utils/renderWithRouter.jsx";
import { screen } from "@testing-library/react";
import Home from "../../src/components/Home.jsx";

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");

  const mockProduct = {
    id: 1,
    title: "Test Product",
    category: "Test Category",
    price: 10,
    description: "This is a test product description",
    rating: { rate: 4.5, count: 20 },
    image: "test.jpg",
  };

  const mockContext = [
    { products: [mockProduct], error: null, loading: false }, // context[0]
    [[{ item: mockProduct, number: 1 }], vi.fn()], // context[1]
    [vi.fn(), vi.fn(), vi.fn()], // context[2]
    [1, vi.fn()], // context[3]
  ];

  return {
    ...mod,
    useOutletContext: () => mockContext, // return array
  };
});

describe("Home component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with the categories of products", () => {
    renderWithRouter(<Home />);
    // Check snapshot
    expect().toMatchSnapshot();
  });

  // Check important UI bits
  it("renders correct text in h3 elements", () => {
    renderWithRouter(<Home />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Test Product");
  });
});
