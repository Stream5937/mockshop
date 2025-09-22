import { renderHook, act } from "@testing-library/react";
import { vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useProducts from "../../src/hooks/useProducts.jsx";

describe("useProducts Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it("loads products successfully", async () => {
    const mockProducts = [{ id: 1, title: "Test Product" }];

    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockProducts,
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("sets error when fetch fails", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.loading).toBe(false);
    });
  });
});
