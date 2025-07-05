import { HttpClient } from './types';
import { AxiosHttpClient } from './axios-client';

export function createHttpClient(): HttpClient {
  return new AxiosHttpClient();
}

export const httpClient = createHttpClient();
