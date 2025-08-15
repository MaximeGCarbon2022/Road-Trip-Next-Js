export type ToastSeverity = "success" | "error" | "warning" | "info";

export interface ToastContextValue {
  showToast: (message: string, severity?: ToastSeverity) => void;
}
