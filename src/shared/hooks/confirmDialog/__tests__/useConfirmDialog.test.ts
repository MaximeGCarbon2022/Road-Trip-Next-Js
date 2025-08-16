import { renderHook, act } from "@testing-library/react";
import { useConfirmDialog } from "../useConfirmDialog";

describe("useConfirmDialog", () => {
  it("should be closed by default", () => {
    const { result } = renderHook(() => useConfirmDialog({ onConfirm: jest.fn() }));

    expect(result.current.open).toBe(false);
    expect(result.current.isPending).toBe(false);
  });

  it("should open and close the dialog", () => {
    const { result } = renderHook(() => useConfirmDialog({ onConfirm: jest.fn() }));

    act(() => {
      result.current.openDialog();
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.closeDialog();
    });
    expect(result.current.open).toBe(false);
  });

  it("should call onConfirm and handle isPending state", async () => {
    const onConfirm = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useConfirmDialog({ onConfirm }));

    await act(async () => {
      await result.current.handleConfirm();
    });

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(result.current.isPending).toBe(false);
    expect(result.current.open).toBe(false);
  });
});
