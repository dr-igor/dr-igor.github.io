/**
 * Geometry for the symbolic glyph strips, in the shared `0 0 100 44` SVG
 * viewBox. Envelope/spectrum baselines sit at y=40; the centroid pitch
 * reference sits at y=30. Plots are symbolic — sized to show relative
 * differences between recipes, not measured.
 */

/** Amplitude-envelope glyph shapes. */
export type EnvShape = "struck" | "pluck" | "sustain" | "swell" | "flat" | "hit"

/** Harmonic-spectrum glyph shapes. */
export type SpecShape =
  | "saw"
  | "square"
  | "sine"
  | "trihi"
  | "pulse"
  | "bars14"
  | "bars13"
  | "bellchurch"
  | "belltube"
  | "inharmhi"
  | "inharmlow"
  | "organ"
  | "formant"
  | "noisehi"
  | "noiseband"

/** Spectral-centroid (brightness-over-time) glyph shapes. */
export type CenShape = "fall" | "fallfast" | "rise" | "flat" | "noise"

export const ENVELOPE_POINTS: Record<EnvShape, string> = {
  struck: "0,40 5,6 18,18 42,29 100,38",
  pluck: "0,40 4,6 13,22 34,33 100,38",
  sustain: "0,40 14,9 82,9 100,40",
  swell: "0,40 34,9 82,9 100,40",
  flat: "0,40 3,9 93,9 96,40 100,40",
  hit: "0,40 4,6 15,28 28,38 100,39",
}

export const CENTROID_POINTS: Record<CenShape, string> = {
  fall: "0,10 30,18 100,27",
  fallfast: "0,6 18,22 100,29",
  rise: "0,29 14,27 38,12 100,12",
  flat: "0,19 100,19",
  noise: "0,11 25,14 50,9 75,14 100,10",
}

export interface SpectrumBar {
  x: number
  height: number
}

export type Spectrum =
  | { kind: "bars"; bars: SpectrumBar[] }
  | { kind: "noise"; x: number; width: number }

export function spectrum(shape: SpecShape): Spectrum {
  if (shape === "noisehi") return { kind: "noise", x: 52, width: 44 }
  if (shape === "noiseband") return { kind: "noise", x: 8, width: 88 }

  const peakShape = PEAK_SHAPES[shape]
  if (peakShape) return { kind: "bars", bars: peaks(peakShape) }

  if (shape === "square") return { kind: "bars", bars: harmonicSeries((n) => 1 / n, 2) }
  if (shape === "pulse")
    return { kind: "bars", bars: harmonicSeries((n) => 0.45 + 0.55 / n) }
  if (shape === "formant") return { kind: "bars", bars: formantSeries() }

  return { kind: "bars", bars: harmonicSeries((n) => 1 / n) }
}

const HARMONIC_SPACING = 6.4
const MAX_X = 97

function harmonicSeries(weight: (n: number) => number, step = 1): SpectrumBar[] {
  const bars: SpectrumBar[] = []
  for (let n = 1; n <= 14; n += step) {
    const x = 4 + n * HARMONIC_SPACING
    if (x > MAX_X) break
    bars.push({ x, height: Math.max(2, 34 * weight(n)) })
  }
  return bars
}

function formantSeries(): SpectrumBar[] {
  const bars: SpectrumBar[] = []
  for (let n = 1; n <= 16; n++) {
    const x = 4 + n * 5.7
    if (x > MAX_X) break
    const lower = Math.exp(-Math.pow((x - 32) / 12, 2))
    const upper = Math.exp(-Math.pow((x - 62) / 14, 2))
    bars.push({ x, height: Math.max(2, 5 + 30 * (lower + 0.7 * upper)) })
  }
  return bars
}

function peaks(points: readonly [number, number][]): SpectrumBar[] {
  return points.map(([x, height]) => ({ x, height: Math.max(2, height) }))
}

const PEAK_SHAPES: Partial<Record<SpecShape, readonly [number, number][]>> = {
  sine: [[8, 34]],
  trihi: [
    [8, 34],
    [15, 11],
    [22, 4],
  ],
  bars14: [
    [8, 34],
    [32, 17],
  ],
  bars13: [
    [8, 34],
    [24, 19],
  ],
  bellchurch: [
    [10, 18],
    [16, 30],
    [21, 25],
    [27, 15],
    [34, 20],
    [45, 11],
    [57, 7],
  ],
  belltube: [
    [14, 10],
    [24, 30],
    [34, 26],
    [44, 18],
    [56, 10],
  ],
  inharmhi: [
    [28, 16],
    [40, 26],
    [52, 20],
    [64, 28],
    [76, 14],
    [88, 9],
  ],
  inharmlow: [
    [8, 16],
    [14, 24],
    [20, 14],
    [27, 28],
    [35, 18],
    [44, 26],
    [55, 15],
    [67, 22],
    [80, 12],
    [92, 8],
  ],
  organ: [
    [6, 26],
    [12, 34],
    [19, 16],
    [26, 24],
    [34, 12],
    [44, 16],
    [58, 9],
  ],
}
