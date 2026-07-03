/**
 * Property 12: No first-person singular pronouns in any site config string.
 * Property 13: No forbidden marketing buzzwords in any site config string.
 * Validates: Requirements 13.1, 13.2, 13.3
 *
 * These are deterministic data tests over static config — no random inputs needed.
 */
import { describe, it, expect } from "vitest";
import {
  SITE,
  META,
  PROOF_CARDS,
  COST_ITEMS,
  SERVICES,
  ENGAGEMENT_PROCESS,
  PRINCIPLES,
  FAQ_ITEMS,
} from "../site";

// Collect every string value from site.ts exports
function collectStrings(obj: unknown): string[] {
  if (typeof obj === "string") return [obj];
  if (Array.isArray(obj)) return obj.flatMap(collectStrings);
  if (obj !== null && typeof obj === "object") {
    return Object.values(obj).flatMap(collectStrings);
  }
  return [];
}

const ALL_STRINGS = collectStrings([
  SITE, META, PROOF_CARDS, COST_ITEMS, SERVICES,
  ENGAGEMENT_PROCESS, PRINCIPLES, FAQ_ITEMS,
]);

describe("Property 12 — No first-person singular pronouns in site config", () => {
  it("no string contains standalone 'I'", () => {
    const offenders = ALL_STRINGS.filter((s) => /\bI\b/.test(s));
    expect(offenders, `Found 'I' in: ${offenders.join(" | ")}`).toHaveLength(0);
  });

  it("no string contains standalone 'my' (case-insensitive)", () => {
    const offenders = ALL_STRINGS.filter((s) => /\bmy\b/i.test(s));
    expect(offenders, `Found 'my' in: ${offenders.join(" | ")}`).toHaveLength(0);
  });

  it("no string contains standalone 'me' (case-insensitive)", () => {
    const offenders = ALL_STRINGS.filter((s) => /\bme\b/i.test(s));
    expect(offenders, `Found 'me' in: ${offenders.join(" | ")}`).toHaveLength(0);
  });
});

describe("Property 13 — No forbidden marketing buzzwords in site config", () => {
  const FORBIDDEN = [
    "revolutionary",
    "cutting-edge",
    "game-changer",
    "synergy",
    "leverage",
    "innovative",
  ];

  for (const word of FORBIDDEN) {
    it(`no string contains "${word}" (case-insensitive)`, () => {
      const re = new RegExp(word, "i");
      const offenders = ALL_STRINGS.filter((s) => re.test(s));
      expect(offenders, `Found "${word}" in: ${offenders.join(" | ")}`).toHaveLength(0);
    });
  }
});
