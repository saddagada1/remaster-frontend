/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import { faker } from "@faker-js/faker";
import { HttpResponse, delay, http } from "msw";

export const getGetAllUserRemastersMock = () => ({
  items: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    createdAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
    description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    duration: faker.number.int({ min: undefined, max: undefined }),
    id: faker.string.uuid(),
    key: faker.number.int({ min: undefined, max: undefined }),
    loops: faker.word.sample(),
    mode: faker.number.int({ min: undefined, max: undefined }),
    name: faker.word.sample(),
    tempo: faker.number.int({ min: undefined, max: undefined }),
    timeSignature: faker.number.int({ min: undefined, max: undefined }),
    tuning: faker.number.int({ min: undefined, max: undefined }),
    updatedAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
    url: faker.word.sample(),
    user: { id: faker.string.uuid(), username: faker.word.sample() },
  })),
  next: faker.helpers.arrayElement([faker.string.uuid(), undefined]),
});

export const getUpdateRemasterMock = () => ({
  createdAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  duration: faker.number.int({ min: undefined, max: undefined }),
  id: faker.string.uuid(),
  key: faker.number.int({ min: undefined, max: undefined }),
  loops: faker.word.sample(),
  mode: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  tempo: faker.number.int({ min: undefined, max: undefined }),
  timeSignature: faker.number.int({ min: undefined, max: undefined }),
  tuning: faker.number.int({ min: undefined, max: undefined }),
  updatedAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  url: faker.word.sample(),
  user: { id: faker.string.uuid(), username: faker.word.sample() },
});

export const getCreateRemasterMock = () => ({
  createdAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  duration: faker.number.int({ min: undefined, max: undefined }),
  id: faker.string.uuid(),
  key: faker.number.int({ min: undefined, max: undefined }),
  loops: faker.word.sample(),
  mode: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  tempo: faker.number.int({ min: undefined, max: undefined }),
  timeSignature: faker.number.int({ min: undefined, max: undefined }),
  tuning: faker.number.int({ min: undefined, max: undefined }),
  updatedAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  url: faker.word.sample(),
  user: { id: faker.string.uuid(), username: faker.word.sample() },
});

export const getGetUserRemasterMock = () => ({
  createdAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  duration: faker.number.int({ min: undefined, max: undefined }),
  id: faker.string.uuid(),
  key: faker.number.int({ min: undefined, max: undefined }),
  loops: faker.word.sample(),
  mode: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  tempo: faker.number.int({ min: undefined, max: undefined }),
  timeSignature: faker.number.int({ min: undefined, max: undefined }),
  tuning: faker.number.int({ min: undefined, max: undefined }),
  updatedAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  url: faker.word.sample(),
  user: { id: faker.string.uuid(), username: faker.word.sample() },
});

export const getGetRemasterMock = () => ({
  createdAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  duration: faker.number.int({ min: undefined, max: undefined }),
  id: faker.string.uuid(),
  key: faker.number.int({ min: undefined, max: undefined }),
  loops: faker.word.sample(),
  mode: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  tempo: faker.number.int({ min: undefined, max: undefined }),
  timeSignature: faker.number.int({ min: undefined, max: undefined }),
  tuning: faker.number.int({ min: undefined, max: undefined }),
  updatedAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
  url: faker.word.sample(),
  user: { id: faker.string.uuid(), username: faker.word.sample() },
});

export const getSearchRemastersMock = () => ({
  items: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    createdAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
    description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    duration: faker.number.int({ min: undefined, max: undefined }),
    id: faker.string.uuid(),
    key: faker.number.int({ min: undefined, max: undefined }),
    loops: faker.word.sample(),
    mode: faker.number.int({ min: undefined, max: undefined }),
    name: faker.word.sample(),
    tempo: faker.number.int({ min: undefined, max: undefined }),
    timeSignature: faker.number.int({ min: undefined, max: undefined }),
    tuning: faker.number.int({ min: undefined, max: undefined }),
    updatedAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
    url: faker.word.sample(),
    user: { id: faker.string.uuid(), username: faker.word.sample() },
  })),
  next: faker.helpers.arrayElement([faker.string.uuid(), undefined]),
});

export const getGetAllRemastersByUserIdMock = () => ({
  items: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    createdAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
    description: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    duration: faker.number.int({ min: undefined, max: undefined }),
    id: faker.string.uuid(),
    key: faker.number.int({ min: undefined, max: undefined }),
    loops: faker.word.sample(),
    mode: faker.number.int({ min: undefined, max: undefined }),
    name: faker.word.sample(),
    tempo: faker.number.int({ min: undefined, max: undefined }),
    timeSignature: faker.number.int({ min: undefined, max: undefined }),
    tuning: faker.number.int({ min: undefined, max: undefined }),
    updatedAt: `${faker.date.past().toISOString().split(".")[0]}Z`,
    url: faker.word.sample(),
    user: { id: faker.string.uuid(), username: faker.word.sample() },
  })),
  next: faker.helpers.arrayElement([faker.string.uuid(), undefined]),
});

export const getRemasterControllerMock = () => [
  http.get("*/user/remaster", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetAllUserRemastersMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.put("*/user/remaster", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getUpdateRemasterMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.post("*/user/remaster", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getCreateRemasterMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.get("*/user/remaster/:id", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetUserRemasterMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.get("*/open/remaster/:id", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetRemasterMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.get("*/open/remaster/search", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getSearchRemastersMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.get("*/open/remaster/all/:id", async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetAllRemastersByUserIdMock()), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
];
