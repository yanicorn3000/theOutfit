import "@testing-library/jest-dom/vitest";
import { server } from "../mocks/server.ts";
import { beforeAll, afterEach, afterAll } from "vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
