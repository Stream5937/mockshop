import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithRouter } from "../utils/renderWithRouter.jsx";
import CategoryProducts from "../../src/components/CategoryProducts.jsx";

// Mock react-router-dom
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
    useParams: () => ({ categoryName: "Test Category" }), // mock params
  };
});

describe("CategoryProducts component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with products in the category", () => {
    const { asFragment, getByText } = renderWithRouter(<CategoryProducts />);

    // Check snapshot
    expect(asFragment()).toMatchSnapshot();

    // Check important UI bits
    expect(getByText("Test Category")).toBeInTheDocument();
    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText(/\$10/)).toBeInTheDocument();
    expect(getByText(/⭐ 4.5/)).toBeInTheDocument();
  });
});
