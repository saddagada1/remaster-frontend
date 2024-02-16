/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type {
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type {
  AuthenticationResponse,
  PageResponseUserResponse,
  SearchUsersParams,
  UpdateUserBody,
  UserResponse,
} from "../../model";
import { customInstance } from "../../lib/axios";
import type { BodyType } from "../../lib/axios";

export const updateUser = (updateUserBody: BodyType<UpdateUserBody>) => {
  const formData = new FormData();
  formData.append("request", JSON.stringify(updateUserBody.request));
  if (updateUserBody.imageFile !== undefined) {
    formData.append("imageFile", updateUserBody.imageFile);
  }

  return customInstance<AuthenticationResponse>({
    url: `/user`,
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
};

export const getUpdateUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateUser>>,
    TError,
    { data: BodyType<UpdateUserBody> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateUser>>,
  TError,
  { data: BodyType<UpdateUserBody> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateUser>>,
    { data: BodyType<UpdateUserBody> }
  > = (props) => {
    const { data } = props ?? {};

    return updateUser(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdateUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateUser>>
>;
export type UpdateUserMutationBody = BodyType<UpdateUserBody>;
export type UpdateUserMutationError = unknown;

export const useUpdateUser = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateUser>>,
    TError,
    { data: BodyType<UpdateUserBody> },
    TContext
  >;
}) => {
  const mutationOptions = getUpdateUserMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getUserByUsername = (username: string, signal?: AbortSignal) => {
  return customInstance<UserResponse>({
    url: `/open/${username}`,
    method: "GET",
    signal,
  });
};

export const getGetUserByUsernameQueryKey = (username: string) => {
  return [`/open/${username}`] as const;
};

export const getGetUserByUsernameInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getUserByUsername>>>,
  TError = unknown,
>(
  username: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getUserByUsername>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetUserByUsernameQueryKey(username);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getUserByUsername>>
  > = ({ signal }) => getUserByUsername(username, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!username,
    ...queryOptions,
  } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getUserByUsername>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetUserByUsernameInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getUserByUsername>>
>;
export type GetUserByUsernameInfiniteQueryError = unknown;

export const useGetUserByUsernameInfinite = <
  TData = InfiniteData<Awaited<ReturnType<typeof getUserByUsername>>>,
  TError = unknown,
>(
  username: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getUserByUsername>>,
        TError,
        TData
      >
    >;
  },
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetUserByUsernameInfiniteQueryOptions(
    username,
    options,
  );

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<
    TData,
    TError
  > & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const getGetUserByUsernameQueryOptions = <
  TData = Awaited<ReturnType<typeof getUserByUsername>>,
  TError = unknown,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getUserByUsername>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetUserByUsernameQueryKey(username);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getUserByUsername>>
  > = ({ signal }) => getUserByUsername(username, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!username,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getUserByUsername>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetUserByUsernameQueryResult = NonNullable<
  Awaited<ReturnType<typeof getUserByUsername>>
>;
export type GetUserByUsernameQueryError = unknown;

export const useGetUserByUsername = <
  TData = Awaited<ReturnType<typeof getUserByUsername>>,
  TError = unknown,
>(
  username: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getUserByUsername>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetUserByUsernameQueryOptions(username, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const searchUsers = (
  params: SearchUsersParams,
  signal?: AbortSignal,
) => {
  return customInstance<PageResponseUserResponse>({
    url: `/open/search`,
    method: "GET",
    params,
    signal,
  });
};

export const getSearchUsersQueryKey = (params: SearchUsersParams) => {
  return [`/open/search`, ...(params ? [params] : [])] as const;
};

export const getSearchUsersInfiniteQueryOptions = <
  TData = InfiniteData<
    Awaited<ReturnType<typeof searchUsers>>,
    SearchUsersParams["cursor"]
  >,
  TError = unknown,
>(
  params: SearchUsersParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof searchUsers>>,
        TError,
        TData,
        Awaited<ReturnType<typeof searchUsers>>,
        QueryKey,
        SearchUsersParams["cursor"]
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getSearchUsersQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof searchUsers>>,
    QueryKey,
    SearchUsersParams["cursor"]
  > = ({ signal, pageParam }) =>
    searchUsers({ ...params, cursor: pageParam || params?.["cursor"] }, signal);

  return { queryKey, queryFn, ...queryOptions } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof searchUsers>>,
    TError,
    TData,
    Awaited<ReturnType<typeof searchUsers>>,
    QueryKey,
    SearchUsersParams["cursor"]
  > & { queryKey: QueryKey };
};

export type SearchUsersInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof searchUsers>>
>;
export type SearchUsersInfiniteQueryError = unknown;

export const useSearchUsersInfinite = <
  TData = InfiniteData<
    Awaited<ReturnType<typeof searchUsers>>,
    SearchUsersParams["cursor"]
  >,
  TError = unknown,
>(
  params: SearchUsersParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof searchUsers>>,
        TError,
        TData,
        Awaited<ReturnType<typeof searchUsers>>,
        QueryKey,
        SearchUsersParams["cursor"]
      >
    >;
  },
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getSearchUsersInfiniteQueryOptions(params, options);

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<
    TData,
    TError
  > & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const getSearchUsersQueryOptions = <
  TData = Awaited<ReturnType<typeof searchUsers>>,
  TError = unknown,
>(
  params: SearchUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof searchUsers>>, TError, TData>
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getSearchUsersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof searchUsers>>> = ({
    signal,
  }) => searchUsers(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof searchUsers>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type SearchUsersQueryResult = NonNullable<
  Awaited<ReturnType<typeof searchUsers>>
>;
export type SearchUsersQueryError = unknown;

export const useSearchUsers = <
  TData = Awaited<ReturnType<typeof searchUsers>>,
  TError = unknown,
>(
  params: SearchUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof searchUsers>>, TError, TData>
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getSearchUsersQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
