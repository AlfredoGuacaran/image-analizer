import { useQuery as useReactQuery } from '@tanstack/react-query';

import { QueryConfig, QueryHook, QueryResult } from './types';

export const createQueryHook = (): QueryHook => {
  return {
    useQuery: <TData, TError = Error>(
      config: QueryConfig<TData, TError>
    ): QueryResult<TData, TError> => {
      const {
        queryKey,
        queryFn,
        enabled = true,
        staleTime,
        cacheTime,
        retry,
        retryDelay,
        onSuccess,
        onError,
      } = config;

      const query = useReactQuery<TData, TError>({
        queryKey,
        queryFn,
        enabled,
        staleTime,
        gcTime: cacheTime,
        retry,
        retryDelay,
      });

      if (onSuccess && query.data) {
        onSuccess(query.data);
      }

      if (onError && query.error) {
        onError(query.error);
      }

      return {
        ...query,
        data: query.data,
        error: query.error,
      };
    },
  };
};
