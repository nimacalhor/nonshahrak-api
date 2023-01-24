import { describe, expect, it, vi } from "vitest";

import { fixQuery } from "./query-fixer";

describe("fixQuery()", () => {
  it("should add $ to query titles", () => {
    // A
    const path = "day";
    const value = "gt 3,lte 4";
    // A
    const result = JSON.stringify(fixQuery(path, value));
    // A
    expect(result).toMatch(/\$gt|\$lte/gm);
  });
  it("should throw error when input is not number or contain query", () => {
    // A
    const path = "day";
    const value = "invalid value";
    // A
    const f = () => JSON.stringify(fixQuery(path, value));
    // A
    expect(f).toThrowError();
  });
  it("should throw error when second part of a string is not a number", () => {
    // A
    const path = "day";
    const value = "gt notANumber,lt 34";
    // A
    const f = () => JSON.stringify(fixQuery(path, value));
    // A
    expect(f).toThrowError();
  });
  it('should', () => {
    // A
    
    // A
    
    // A
    
  });
});
