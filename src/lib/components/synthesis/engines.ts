export type EngineKey = "SUB" | "ADD" | "FM" | "KS" | "S-F" | "N+E" | "INH"

export const ENGINE_METHOD: Record<EngineKey, string> = {
  SUB: "subtractive",
  ADD: "additive",
  FM: "fm",
  KS: "karplus–strong",
  "S-F": "source–filter",
  "N+E": "noise+env",
  INH: "inharmonic",
}

/**
 * Per-engine accent color for the pill tint and border. Chosen to read on both
 * light and dark backgrounds; the pill's text stays neutral for contrast.
 */
export const ENGINE_COLOR: Record<EngineKey, string> = {
  SUB: "#3b82f6",
  ADD: "#10b981",
  FM: "#ec4899",
  KS: "#f59e0b",
  "S-F": "#8b5cf6",
  "N+E": "#f97316",
  INH: "#14b8a6",
}
