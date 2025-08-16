import { ApiError } from "@/lib/apiError";
import { fetchData } from "../fetchData";
import { cookies } from "next/headers";

// Mock next/headers
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockCookies = cookies as jest.MockedFunction<typeof cookies>;

describe("fetchData", () => {
  const mockToken = "mock-jwt-token";
  const mockEndpoint = "/users";
  const mockUrl = `http://localhost:3000/api${mockEndpoint}`;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: mockToken }),
    } as never);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Successful requests", () => {
    it("should fetch data successfully with token from cookies", async () => {
      const mockData = { id: 1, name: "John" };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
      });

      const result = await fetchData(mockEndpoint);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      expect(result).toEqual(mockData);
    });

    it("should merge custom headers with default headers", async () => {
      const mockData = { success: true };
      const customHeaders = { "Custom-Header": "custom-value" };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
      });

      await fetchData(mockEndpoint, { headers: customHeaders });

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          "Custom-Header": "custom-value",
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
    });

    it("should return null for empty response", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(""),
      });

      const result = await fetchData(mockEndpoint);

      expect(result).toBeNull();
    });
  });

  describe("Special status codes", () => {
    it("should return default structure for 404 status", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      const result = await fetchData(mockEndpoint);

      expect(result).toEqual({ data: [], total: 0 });
    });

    it("should return default structure for 204 status", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 204,
        statusText: "No Content",
      });

      const result = await fetchData(mockEndpoint);

      expect(result).toEqual({ data: [], total: 0 });
    });
  });

  describe("Error handling", () => {
    it("should throw ApiError for non-ok responses", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
      });

      await expect(fetchData(mockEndpoint)).rejects.toThrow(ApiError);
      await expect(fetchData(mockEndpoint)).rejects.toThrow(
        "Erreur API 500 : Internal Server Error",
      );
    });

    it("should use error message from response body when available", async () => {
      const errorResponse = { message: "Custom error message" };
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        json: jest.fn().mockResolvedValue(errorResponse),
      });

      await expect(fetchData(mockEndpoint)).rejects.toThrow(ApiError);
      await expect(fetchData(mockEndpoint)).rejects.toThrow("Custom error message");
    });

    it("should handle JSON parse errors gracefully in error response", async () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
      });

      await expect(fetchData(mockEndpoint)).rejects.toThrow(
        "Erreur API 500 : Internal Server Error",
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        "Impossible de parser la réponse en JSON :",
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    it("should handle JSON parse errors in successful response", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue("invalid-json{"),
      });

      await expect(fetchData(mockEndpoint)).rejects.toThrow(SyntaxError);
    });
  });

  describe("Authentication", () => {
    it("should handle missing token gracefully", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue(undefined),
      } as never);

      const mockData = { success: true };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
      });

      await fetchData(mockEndpoint);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          Authorization: "Bearer undefined",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
    });

    it("should handle empty token value", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "" }),
      } as never);

      const mockData = { success: true };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
      });

      await fetchData(mockEndpoint);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          Authorization: "Bearer ",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
    });
  });

  describe("Request options", () => {
    it("should pass through custom request options", async () => {
      const mockData = { success: true };
      const customOptions = {
        method: "POST",
        body: JSON.stringify({ name: "test" }),
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
      });

      await fetchData(mockEndpoint, customOptions);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        method: "POST",
        body: JSON.stringify({ name: "test" }),
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
    });

    it("should override cache option when specified", async () => {
      const mockData = { success: true };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
      });

      await fetchData(mockEndpoint, { cache: "force-cache" });

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("Type safety", () => {
    it("should return typed data when specified", async () => {
      interface User {
        id: number;
        name: string;
      }

      const mockUser: User = { id: 1, name: "John" };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockUser)),
      });

      const result = await fetchData<User>(mockEndpoint);

      expect(result).toEqual(mockUser);
      // TypeScript compilation should ensure result is User | null
    });
  });
});
