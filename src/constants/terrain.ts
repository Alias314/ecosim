import { Color } from "three";

export const terrainType = {
  water: {
    minHeight: 0.2,
    maxHeight: 0.4,
    minColor: new Color('#1e40af'),
    maxColor: new Color('#38bdf8')
  },
  lowSand: {
    minHeight: 0.4,
    maxHeight: 0.425,
    minColor: new Color('#fde68a'),
    maxColor: new Color('#fcd34d')
  },
  highSand: {
    minHeight: 0.425,
    maxHeight: 0.45,
    minColor: new Color('#fcd34d'),
    maxColor: new Color('#86efac')
  },
  grass: {
    minHeight: 0.45,
    maxHeight: 0.7,
    minColor: new Color('#86efac'),
    maxColor: new Color('#22c55e')
  },
  tree: {
    minHeight: 0.7,
    maxHeight: 0.75,
    minColor: new Color('#22c55e'),
    maxColor: new Color('#d1d5db')
  },
}

export const boundary = {
  x: { min: 0, max: 10 },
  z: { min: 0, max: 10 },
};
