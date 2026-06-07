import { describe, it, expect } from "vitest";
import { SITE } from "./site";

describe("SITE", () => {
  it("has a non-empty name", () => {
    expect(SITE.name.length).toBeGreaterThan(0);
  });

  it("has a non-empty description", () => {
    expect(SITE.description.length).toBeGreaterThan(0);
  });
});
