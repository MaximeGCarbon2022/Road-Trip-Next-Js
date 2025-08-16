import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { requireAuth } from "../auth";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const mockCookies = cookies as jest.MockedFunction<typeof cookies>;
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;
const mockJwtVerify = jwt.verify as jest.MockedFunction<typeof jwt.verify>;

const originalEnv = process.env;

describe("requireAuth", () => {
  const mockToken = "valid-jwt-token";
  const mockSecret = "test-secret-key";

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock des variables d'
    process.env = {
      ...originalEnv,
      ACCESS_TOKEN_SECRET: mockSecret,
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("Token validation", () => {
    it("should pass when token is valid", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: mockToken }),
      } as never);

      mockJwtVerify.mockReturnValue({ userId: 1 } as never);

      await requireAuth();

      expect(mockCookies).toHaveBeenCalledTimes(1);
      expect(mockJwtVerify).toHaveBeenCalledWith(mockToken, mockSecret);
      expect(mockRedirect).not.toHaveBeenCalled();
    });

    it("should call jwt.verify with correct parameters", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: mockToken }),
      } as never);

      mockJwtVerify.mockReturnValue({ userId: 1 } as never);

      await requireAuth();

      expect(mockJwtVerify).toHaveBeenCalledWith(mockToken, process.env.ACCESS_TOKEN_SECRET);
    });
  });

  describe("Missing token scenarios", () => {
    it("should redirect to /login when no token cookie exists", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue(undefined),
      } as never);

      await requireAuth();

      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("should redirect to /login when token cookie exists but has no value", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: undefined }),
      } as never);

      await requireAuth();

      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("should redirect to /login when token cookie has empty string value", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "" }),
      } as never);

      await requireAuth();

      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });
  });

  describe("Invalid token scenarios", () => {
    beforeEach(() => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: mockToken }),
      } as never);
    });

    it("should redirect to /login when jwt.verify throws an error", async () => {
      mockJwtVerify.mockImplementation(() => {
        throw new Error("Invalid token");
      });

      await requireAuth();

      expect(mockJwtVerify).toHaveBeenCalledWith(mockToken, mockSecret);
      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("should redirect to /login when token is expired", async () => {
      mockJwtVerify.mockImplementation(() => {
        const error = new Error("Token expired");
        error.name = "TokenExpiredError";
        throw error;
      });

      await requireAuth();

      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("should redirect to /login when token is malformed", async () => {
      mockJwtVerify.mockImplementation(() => {
        const error = new Error("Malformed token");
        error.name = "JsonWebTokenError";
        throw error;
      });

      await requireAuth();

      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("should redirect to /login for any jwt verification error", async () => {
      mockJwtVerify.mockImplementation(() => {
        throw new Error("Some random JWT error");
      });

      await requireAuth();

      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });
  });

  describe("Environment variables", () => {
    it("should work with ACCESS_TOKEN_SECRET from environment", async () => {
      const customSecret = "custom-secret-123";
      process.env.ACCESS_TOKEN_SECRET = customSecret;

      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: mockToken }),
      } as never);

      mockJwtVerify.mockReturnValue({ userId: 1 } as never);

      await requireAuth();

      expect(mockJwtVerify).toHaveBeenCalledWith(mockToken, customSecret);
    });
  });

  describe("Cookies access", () => {
    it("should call cookies function to access request cookies", async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockToken }),
      };

      mockCookies.mockResolvedValue(mockCookieStore as never);
      mockJwtVerify.mockReturnValue({ userId: 1 } as never);

      await requireAuth();

      expect(mockCookies).toHaveBeenCalledTimes(1);
      expect(mockCookieStore.get).toHaveBeenCalledWith("token");
    });

    it("should handle cookies function throwing an error", async () => {
      mockCookies.mockRejectedValue(new Error("Cookies access failed"));

      await expect(requireAuth()).rejects.toThrow("Cookies access failed");

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(mockJwtVerify).not.toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    it("should handle null token value", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: null }),
      } as never);

      await requireAuth();

      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("should not call redirect multiple times on error", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue(undefined),
      } as never);

      await requireAuth();

      expect(mockRedirect).toHaveBeenCalledTimes(1);
      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });
  });
});
