import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  assertCompiledChangeBustsAssetUrl,
  fingerprintedAssetName,
  rewriteAssetReferences,
  stripAssetFingerprint,
} from "./academy-asset-fingerprint";

describe("academy asset fingerprint contract", () => {
  it("strips and applies -pk######## fingerprints", () => {
    assert.equal(stripAssetFingerprint("0oj-u7ius89fk.js"), "0oj-u7ius89fk.js");
    assert.equal(
      stripAssetFingerprint("0oj-u7ius89fk-pkabcdef12.js"),
      "0oj-u7ius89fk.js"
    );
    assert.equal(
      fingerprintedAssetName("0oj-u7ius89fk.js", "abcdef12"),
      "0oj-u7ius89fk-pkabcdef12.js"
    );
    assert.equal(
      fingerprintedAssetName("0oj-u7ius89fk-pk11111111.js", "abcdef12"),
      "0oj-u7ius89fk-pkabcdef12.js"
    );
  });

  it("rewrites longest basenames first", () => {
    const text =
      'src="/_next/static/chunks/0oj-u7ius89fk-pk11111111.js" and 0oj-u7ius89fk.js';
    const out = rewriteAssetReferences(text, {
      "0oj-u7ius89fk.js": "0oj-u7ius89fk-pkabcdef12.js",
      "0oj-u7ius89fk-pk11111111.js": "0oj-u7ius89fk-pkabcdef12.js",
    });
    assert.equal(
      out,
      'src="/_next/static/chunks/0oj-u7ius89fk-pkabcdef12.js" and 0oj-u7ius89fk-pkabcdef12.js'
    );
  });

  it("fails when compiled bytes change without URL fingerprint change", () => {
    assert.throws(
      () =>
        assertCompiledChangeBustsAssetUrl({
          previousUrlBasename: "0oj-u7ius89fk.js",
          previousContentHash8: "11111111",
          nextUrlBasename: "0oj-u7ius89fk.js",
          nextContentHash8: "abcdef12",
          privacyUrlInBundle: "https://pakish.org/privacy",
        }),
      /asset URL basename stayed/
    );
  });

  it("passes when content change produces matching fingerprinted URL and privacy link", () => {
    assert.doesNotThrow(() =>
      assertCompiledChangeBustsAssetUrl({
        previousUrlBasename: "0oj-u7ius89fk.js",
        previousContentHash8: "11111111",
        nextUrlBasename: "0oj-u7ius89fk-pkabcdef12.js",
        nextContentHash8: "abcdef12",
        privacyUrlInBundle: "https://pakish.org/privacy",
      })
    );
  });

  it("fails when privacy URL is not Pakish", () => {
    assert.throws(
      () =>
        assertCompiledChangeBustsAssetUrl({
          previousUrlBasename: "0oj-u7ius89fk.js",
          previousContentHash8: "11111111",
          nextUrlBasename: "0oj-u7ius89fk-pkabcdef12.js",
          nextContentHash8: "abcdef12",
          privacyUrlInBundle: "https://www.learnhouse.io/privacy",
        }),
      /pakish\.org\/privacy/
    );
  });
});
