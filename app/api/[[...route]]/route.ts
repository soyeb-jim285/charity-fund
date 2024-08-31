import { Hono } from "hono";
import { handle } from "hono/vercel";
import funds from "./funds";
import accounts from "./accounts";
import checkUsername from "./check-username";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/funds", funds)
  .route("/accounts", accounts)
  .route("/check-username", checkUsername);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
