import { QueryKey, UseQueryResult } from '@tanstack/react-query';

export type QueryConfig<TData, TError> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: boolean | number;
  retryDelay?: number;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
};

export type QueryResult<TData, TError = Error> = Omit<
  UseQueryResult<TData, TError>,
  'data' | 'error'
> & {
  data: TData | undefined;
  error: TError | null;
};

export interface QueryHook {
  useQuery: <TData, TError = Error>(
    config: QueryConfig<TData, TError>
  ) => QueryResult<TData, TError>;
}
