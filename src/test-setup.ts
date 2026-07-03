import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Clean up after every test to prevent DOM accumulation
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver — framer-motion v12 calls `new IntersectionObserver()`
// so the mock MUST be a class constructor, not a plain arrow function.
class IntersectionObserverMock {
  observe   = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  constructor() {}
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// Also stub ResizeObserver for good measure (used by some Radix primitives)
class ResizeObserverMock {
  observe   = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}
vi.stubGlobal("ResizeObserver", ResizeObserverMock);
