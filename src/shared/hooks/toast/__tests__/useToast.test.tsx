import React, { PropsWithChildren } from "react";
import { render, renderHook } from "@testing-library/react";
import { ToastContext, useToast } from "../useToast";
import { ToastContextValue, ToastSeverity } from "@/shared/interfaces/Toast";

const mockToastContextValue: ToastContextValue = {
  showToast: jest.fn(),
};

const TestComponent = () => {
  const { showToast } = useToast();
  return React.createElement(
    "div",
    { "data-testid": "test-component" },
    React.createElement(
      "button",
      {
        "data-testid": "show-toast-btn",
        onClick: () => showToast("Test message"),
      },
      "Show Toast",
    ),
  );
};

describe("ToastContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useToast hook", () => {
    it("should throw an error when used outside of ToastProvider", () => {
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        renderHook(() => useToast());
      }).toThrow("useToast must be used within a ToastProvider");

      console.error = originalError;
    });

    it("should return the context value when used within ToastProvider", () => {
      const wrapper = ({ children }: PropsWithChildren) =>
        React.createElement(ToastContext.Provider, { value: mockToastContextValue }, children);

      const { result } = renderHook(() => useToast(), { wrapper });

      expect(result.current).toBe(mockToastContextValue);
      expect(result.current.showToast).toBeDefined();
      expect(typeof result.current.showToast).toBe("function");
    });

    it("should provide access to showToast method", () => {
      const wrapper = ({ children }: PropsWithChildren) =>
        React.createElement(ToastContext.Provider, { value: mockToastContextValue }, children);

      const { result } = renderHook(() => useToast(), { wrapper });

      expect(typeof result.current.showToast).toBe("function");

      result.current.showToast("Test message");
      expect(mockToastContextValue.showToast).toHaveBeenCalledWith("Test message");
    });
  });

  describe("ToastContext Provider", () => {
    it("should provide context value to child components", () => {
      const { getByTestId } = render(
        React.createElement(
          ToastContext.Provider,
          { value: mockToastContextValue },
          React.createElement(TestComponent),
        ),
      );

      const testComponent = getByTestId("test-component");
      const button = getByTestId("show-toast-btn");

      expect(testComponent).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it("should handle undefined context gracefully in provider", () => {
      const { getByTestId } = render(
        React.createElement(
          ToastContext.Provider,
          { value: undefined },
          React.createElement("div", { "data-testid": "undefined-context" }, "No context"),
        ),
      );

      expect(getByTestId("undefined-context")).toBeInTheDocument();
    });
  });
});

describe("Toast Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call showToast with message only", () => {
    const wrapper = ({ children }: PropsWithChildren) =>
      React.createElement(ToastContext.Provider, { value: mockToastContextValue }, children);

    const { result } = renderHook(() => useToast(), { wrapper });

    result.current.showToast("Success message");

    expect(mockToastContextValue.showToast).toHaveBeenCalledWith("Success message");
    expect(mockToastContextValue.showToast).toHaveBeenCalledTimes(1);
  });

  it("should call showToast with message and severity", () => {
    const wrapper = ({ children }: PropsWithChildren) =>
      React.createElement(ToastContext.Provider, { value: mockToastContextValue }, children);

    const { result } = renderHook(() => useToast(), { wrapper });

    result.current.showToast("Error message", "error" as ToastSeverity);

    expect(mockToastContextValue.showToast).toHaveBeenCalledWith("Error message", "error");
    expect(mockToastContextValue.showToast).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple showToast calls", () => {
    const wrapper = ({ children }: PropsWithChildren) =>
      React.createElement(ToastContext.Provider, { value: mockToastContextValue }, children);

    const { result } = renderHook(() => useToast(), { wrapper });

    result.current.showToast("First message");
    result.current.showToast("Second message", "warning" as ToastSeverity);

    expect(mockToastContextValue.showToast).toHaveBeenCalledTimes(2);
    expect(mockToastContextValue.showToast).toHaveBeenNthCalledWith(1, "First message");
    expect(mockToastContextValue.showToast).toHaveBeenNthCalledWith(2, "Second message", "warning");
  });
});
