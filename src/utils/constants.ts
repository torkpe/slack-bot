import { DbUrl } from "./types";

export const dbUrl: DbUrl = {
  development: process.env.DEV_DATABASE_URL,
  production: process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
}


export const modelName = "interactions";
