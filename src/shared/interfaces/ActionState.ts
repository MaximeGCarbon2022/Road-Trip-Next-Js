export type ActionState =
  | { success: true; status?: number; error?: undefined }
  | { success: false; status?: number; error: string };
