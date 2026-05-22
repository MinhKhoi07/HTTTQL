export type ApiResponse<T> = {
  message: string;
  data: T;
};

export function ok<T>(message: string, data: T): ApiResponse<T> {
  return { message, data };
}
