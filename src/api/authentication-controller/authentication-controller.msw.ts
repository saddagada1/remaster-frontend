/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import { faker } from "@faker-js/faker";
import { HttpResponse, delay, http } from "msw";

export const getSendVerificationEmailMock = () => faker.word.sample();

export const getVerifyEmailMock = () => faker.word.sample();

export const getSendForgotPasswordEmailMock = () => faker.word.sample();

export const getRegisterUserMock = () => ({
  accessToken: faker.word.sample(),
  expiresAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  refreshToken: faker.word.sample(),
  user: {
    bio: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    email: faker.word.sample(),
    followedBySessionUser: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    id: faker.string.uuid(),
    image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    role: faker.helpers.arrayElement(["USER", "ADMIN"] as const),
    totalFollowers: faker.number.int({ min: undefined, max: undefined }),
    totalFollowing: faker.number.int({ min: undefined, max: undefined }),
    totalRemasters: faker.number.int({ min: undefined, max: undefined }),
    username: faker.word.sample(),
    verified: faker.datatype.boolean(),
  },
});

export const getRefreshTokenMock = () => ({
  accessToken: faker.word.sample(),
  expiresAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  refreshToken: faker.word.sample(),
  user: {
    bio: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    email: faker.word.sample(),
    followedBySessionUser: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    id: faker.string.uuid(),
    image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    role: faker.helpers.arrayElement(["USER", "ADMIN"] as const),
    totalFollowers: faker.number.int({ min: undefined, max: undefined }),
    totalFollowing: faker.number.int({ min: undefined, max: undefined }),
    totalRemasters: faker.number.int({ min: undefined, max: undefined }),
    username: faker.word.sample(),
    verified: faker.datatype.boolean(),
  },
});

export const getLogoutUserMock = () => faker.word.sample();

export const getLoginUserMock = () => ({
  accessToken: faker.word.sample(),
  expiresAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  refreshToken: faker.word.sample(),
  user: {
    bio: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    email: faker.word.sample(),
    followedBySessionUser: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    id: faker.string.uuid(),
    image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    role: faker.helpers.arrayElement(["USER", "ADMIN"] as const),
    totalFollowers: faker.number.int({ min: undefined, max: undefined }),
    totalFollowing: faker.number.int({ min: undefined, max: undefined }),
    totalRemasters: faker.number.int({ min: undefined, max: undefined }),
    username: faker.word.sample(),
    verified: faker.datatype.boolean(),
  },
});

export const getChangeForgottenPasswordMock = () => ({
  accessToken: faker.word.sample(),
  expiresAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  refreshToken: faker.word.sample(),
  user: {
    bio: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    email: faker.word.sample(),
    followedBySessionUser: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    id: faker.string.uuid(),
    image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    role: faker.helpers.arrayElement(["USER", "ADMIN"] as const),
    totalFollowers: faker.number.int({ min: undefined, max: undefined }),
    totalFollowing: faker.number.int({ min: undefined, max: undefined }),
    totalRemasters: faker.number.int({ min: undefined, max: undefined }),
    username: faker.word.sample(),
    verified: faker.datatype.boolean(),
  },
});

export const getAuthenticationControllerMock = () => [
  http.post("*/user/send-verification-email", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getSendVerificationEmailMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("*/auth/verify-email", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getVerifyEmailMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("*/auth/send-forgot-password-email", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getSendForgotPasswordEmailMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("*/auth/register", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getRegisterUserMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("*/auth/refresh_token", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getRefreshTokenMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("*/auth/logout", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getLogoutUserMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("*/auth/login", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getLoginUserMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("*/auth/change-forgotten-password", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getChangeForgottenPasswordMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
];
