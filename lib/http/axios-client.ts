import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { HttpClient, HttpRequestConfig } from './types';

export class AxiosHttpClient implements HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
        if (error.request) {
          return Promise.reject({ message: 'No response from server' });
        }
        return Promise.reject({ message: 'Request failed' });
      }
    );
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}
