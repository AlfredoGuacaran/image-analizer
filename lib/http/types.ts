export interface HttpResponse<T> {
  data: T;
  status: number;
}

export interface HttpError {
  message: string;
  status?: number;
  data?: unknown;
}

export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export interface HttpClient {
  get<T>(url: string, config?: HttpRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
  delete<T>(url: string, config?: HttpRequestConfig): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
}
