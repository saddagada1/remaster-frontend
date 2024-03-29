/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";
import type {
  AuthenticationResponse,
  ChangeForgottenPasswordParams,
  LoginRequest,
  RegisterRequest,
  SendForgotPasswordEmailParams,
  VerifyEmailParams,
} from "../../model";
import { customInstance } from "../../lib/axios";
import type { BodyType } from "../../lib/axios";

export const sendVerificationEmail = () => {
  return customInstance<string>({
    url: `/user/send-verification-email`,
    method: "POST",
  });
};

export const getSendVerificationEmailMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof sendVerificationEmail>>,
    TError,
    void,
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof sendVerificationEmail>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof sendVerificationEmail>>,
    void
  > = () => {
    return sendVerificationEmail();
  };

  return { mutationFn, ...mutationOptions };
};

export type SendVerificationEmailMutationResult = NonNullable<
  Awaited<ReturnType<typeof sendVerificationEmail>>
>;

export type SendVerificationEmailMutationError = unknown;

export const useSendVerificationEmail = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof sendVerificationEmail>>,
    TError,
    void,
    TContext
  >;
}) => {
  const mutationOptions = getSendVerificationEmailMutationOptions(options);

  return useMutation(mutationOptions);
};
export const verifyEmail = (params: VerifyEmailParams) => {
  return customInstance<string>({
    url: `/auth/verify-email`,
    method: "POST",
    params,
  });
};

export const getVerifyEmailMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof verifyEmail>>,
    TError,
    { params: VerifyEmailParams },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof verifyEmail>>,
  TError,
  { params: VerifyEmailParams },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof verifyEmail>>,
    { params: VerifyEmailParams }
  > = (props) => {
    const { params } = props ?? {};

    return verifyEmail(params);
  };

  return { mutationFn, ...mutationOptions };
};

export type VerifyEmailMutationResult = NonNullable<
  Awaited<ReturnType<typeof verifyEmail>>
>;

export type VerifyEmailMutationError = unknown;

export const useVerifyEmail = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof verifyEmail>>,
    TError,
    { params: VerifyEmailParams },
    TContext
  >;
}) => {
  const mutationOptions = getVerifyEmailMutationOptions(options);

  return useMutation(mutationOptions);
};
export const sendForgotPasswordEmail = (
  params: SendForgotPasswordEmailParams,
) => {
  return customInstance<string>({
    url: `/auth/send-forgot-password-email`,
    method: "POST",
    params,
  });
};

export const getSendForgotPasswordEmailMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof sendForgotPasswordEmail>>,
    TError,
    { params: SendForgotPasswordEmailParams },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof sendForgotPasswordEmail>>,
  TError,
  { params: SendForgotPasswordEmailParams },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof sendForgotPasswordEmail>>,
    { params: SendForgotPasswordEmailParams }
  > = (props) => {
    const { params } = props ?? {};

    return sendForgotPasswordEmail(params);
  };

  return { mutationFn, ...mutationOptions };
};

export type SendForgotPasswordEmailMutationResult = NonNullable<
  Awaited<ReturnType<typeof sendForgotPasswordEmail>>
>;

export type SendForgotPasswordEmailMutationError = unknown;

export const useSendForgotPasswordEmail = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof sendForgotPasswordEmail>>,
    TError,
    { params: SendForgotPasswordEmailParams },
    TContext
  >;
}) => {
  const mutationOptions = getSendForgotPasswordEmailMutationOptions(options);

  return useMutation(mutationOptions);
};
export const registerUser = (registerRequest: BodyType<RegisterRequest>) => {
  return customInstance<AuthenticationResponse>({
    url: `/auth/register`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: registerRequest,
  });
};

export const getRegisterUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof registerUser>>,
    TError,
    { data: BodyType<RegisterRequest> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof registerUser>>,
  TError,
  { data: BodyType<RegisterRequest> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof registerUser>>,
    { data: BodyType<RegisterRequest> }
  > = (props) => {
    const { data } = props ?? {};

    return registerUser(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type RegisterUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof registerUser>>
>;
export type RegisterUserMutationBody = BodyType<RegisterRequest>;
export type RegisterUserMutationError = unknown;

export const useRegisterUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof registerUser>>,
    TError,
    { data: BodyType<RegisterRequest> },
    TContext
  >;
}) => {
  const mutationOptions = getRegisterUserMutationOptions(options);

  return useMutation(mutationOptions);
};
export const refreshToken = () => {
  return customInstance<AuthenticationResponse>({
    url: `/auth/refresh_token`,
    method: "POST",
  });
};

export const getRefreshTokenMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof refreshToken>>,
    TError,
    void,
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof refreshToken>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof refreshToken>>,
    void
  > = () => {
    return refreshToken();
  };

  return { mutationFn, ...mutationOptions };
};

export type RefreshTokenMutationResult = NonNullable<
  Awaited<ReturnType<typeof refreshToken>>
>;

export type RefreshTokenMutationError = unknown;

export const useRefreshToken = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof refreshToken>>,
    TError,
    void,
    TContext
  >;
}) => {
  const mutationOptions = getRefreshTokenMutationOptions(options);

  return useMutation(mutationOptions);
};
export const logoutUser = () => {
  return customInstance<string>({ url: `/auth/logout`, method: "POST" });
};

export const getLogoutUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof logoutUser>>,
    TError,
    void,
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof logoutUser>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof logoutUser>>,
    void
  > = () => {
    return logoutUser();
  };

  return { mutationFn, ...mutationOptions };
};

export type LogoutUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof logoutUser>>
>;

export type LogoutUserMutationError = unknown;

export const useLogoutUser = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof logoutUser>>,
    TError,
    void,
    TContext
  >;
}) => {
  const mutationOptions = getLogoutUserMutationOptions(options);

  return useMutation(mutationOptions);
};
export const loginUser = (loginRequest: BodyType<LoginRequest>) => {
  return customInstance<AuthenticationResponse>({
    url: `/auth/login`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: loginRequest,
  });
};

export const getLoginUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof loginUser>>,
    TError,
    { data: BodyType<LoginRequest> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof loginUser>>,
  TError,
  { data: BodyType<LoginRequest> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof loginUser>>,
    { data: BodyType<LoginRequest> }
  > = (props) => {
    const { data } = props ?? {};

    return loginUser(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type LoginUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof loginUser>>
>;
export type LoginUserMutationBody = BodyType<LoginRequest>;
export type LoginUserMutationError = unknown;

export const useLoginUser = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof loginUser>>,
    TError,
    { data: BodyType<LoginRequest> },
    TContext
  >;
}) => {
  const mutationOptions = getLoginUserMutationOptions(options);

  return useMutation(mutationOptions);
};
export const changeForgottenPassword = (
  params: ChangeForgottenPasswordParams,
) => {
  return customInstance<AuthenticationResponse>({
    url: `/auth/change-forgotten-password`,
    method: "POST",
    params,
  });
};

export const getChangeForgottenPasswordMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof changeForgottenPassword>>,
    TError,
    { params: ChangeForgottenPasswordParams },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof changeForgottenPassword>>,
  TError,
  { params: ChangeForgottenPasswordParams },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof changeForgottenPassword>>,
    { params: ChangeForgottenPasswordParams }
  > = (props) => {
    const { params } = props ?? {};

    return changeForgottenPassword(params);
  };

  return { mutationFn, ...mutationOptions };
};

export type ChangeForgottenPasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof changeForgottenPassword>>
>;

export type ChangeForgottenPasswordMutationError = unknown;

export const useChangeForgottenPassword = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof changeForgottenPassword>>,
    TError,
    { params: ChangeForgottenPasswordParams },
    TContext
  >;
}) => {
  const mutationOptions = getChangeForgottenPasswordMutationOptions(options);

  return useMutation(mutationOptions);
};
