/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type { RemasterRequest, RemasterResponse } from "../../model";
import { customInstance } from "../../lib/axios";
import type { BodyType } from "../../lib/axios";

export const createRemaster = (remasterRequest: BodyType<RemasterRequest>) => {
  return customInstance<RemasterResponse>({
    url: `/user/remaster`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: remasterRequest,
  });
};

export const getCreateRemasterMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createRemaster>>,
    TError,
    { data: BodyType<RemasterRequest> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof createRemaster>>,
  TError,
  { data: BodyType<RemasterRequest> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createRemaster>>,
    { data: BodyType<RemasterRequest> }
  > = (props) => {
    const { data } = props ?? {};

    return createRemaster(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateRemasterMutationResult = NonNullable<
  Awaited<ReturnType<typeof createRemaster>>
>;
export type CreateRemasterMutationBody = BodyType<RemasterRequest>;
export type CreateRemasterMutationError = unknown;

export const useCreateRemaster = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createRemaster>>,
    TError,
    { data: BodyType<RemasterRequest> },
    TContext
  >;
}) => {
  const mutationOptions = getCreateRemasterMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getUserRemaster = (id: string, signal?: AbortSignal) => {
  return customInstance<RemasterResponse>({
    url: `/user/remaster/${id}`,
    method: "GET",
    signal,
  });
};

export const getGetUserRemasterQueryKey = (id: string) => {
  return [`/user/remaster/${id}`] as const;
};

export const getGetUserRemasterQueryOptions = <
  TData = Awaited<ReturnType<typeof getUserRemaster>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getUserRemaster>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUserRemasterQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserRemaster>>> = ({
    signal,
  }) => getUserRemaster(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getUserRemaster>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetUserRemasterQueryResult = NonNullable<
  Awaited<ReturnType<typeof getUserRemaster>>
>;
export type GetUserRemasterQueryError = unknown;

export const useGetUserRemaster = <
  TData = Awaited<ReturnType<typeof getUserRemaster>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getUserRemaster>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetUserRemasterQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
