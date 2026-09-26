import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  assertSafeProofRelativePath,
  parseProofDataUrl,
} from "./payment-proof-file";

const PNG_1X1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

describe("payment proof file validation", () => {
  it("accepts valid png data url", () => {
    const result = parseProofDataUrl(PNG_1X1);
    assert.equal(result.ext, "png");
  });

  it("rejects mime spoof without matching magic bytes", () => {
    const fake =
      "data:image/png;base64," + Buffer.from("not-an-image").toString("base64");
    assert.throws(() => parseProofDataUrl(fake), /UNSUPPORTED_IMAGE/);
  });

  it("rejects path traversal", () => {
    assert.throws(
      () => assertSafeProofRelativePath("../secrets.txt"),
      /INVALID_PATH/
    );
  });
});
