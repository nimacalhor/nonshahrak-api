import { describe, expect, it } from "vitest";

import app from "../app";
import request from "supertest";

describe("GET /orders", () => {
  it("should send all orders when there is no filter", async () => {
    // A
    const reqBody = {};
    const expectedLength = 500;
    // A
    const res = await request(app).get("/api/v1/orders").send(reqBody);
    // A
    expect(res.body.data.orders.length).toEqual(expectedLength);
  });
});
