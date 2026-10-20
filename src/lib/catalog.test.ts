import { test } from "node:test";
import assert from "node:assert/strict";
import { summarize } from "./catalog";
test("calculates quantities and monetary totals in integer cents", () => {
  const result = summarize({ "GS-001": 2, "GS-002": 3 });
  assert.equal(result.units, 5);
  assert.equal(result.totalCents, 11800);
});
test("excludes unavailable, unknown, invalid, and out-of-tenant items", () => {
  for (const value of [-1, 100, 1.5, NaN, Infinity])
    assert.equal(summarize({ "GS-001": value }).units, 0);
  assert.equal(summarize({ "GS-004": 1, unknown: 2 }).units, 0);
  assert.equal(summarize({ "GS-001": 1 }, "other-business").units, 0);
});
test("supports removal to zero and maximum request quantity", () => {
  assert.equal(summarize({ "GS-001": 0 }).totalCents, 0);
  assert.equal(summarize({ "GS-001": 99 }).units, 99);
});
