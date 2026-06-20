import { Color } from "three";
import { generateHeightMap } from "../utils/terrain";
import { getRandomIntAtRange } from "../utils/math";

const baseAttributes = {
  size: 1024,
  height: 1,
  heightMapSize: 1024,
  heightMapScale: 9,
  zoom: 1.5,
  lod: 9,
  falloff: 0.5,
  seed: getRandomIntAtRange(100000, 999999),
  boundary: {
    x: { min: 0, max: 10 },
    z: { min: 0, max: 10 },
    offset: 0.01
  }
};

export const defaultTerrainAttributes = {
  ...baseAttributes,
  heightMap: generateHeightMap({ terrainAttributes: baseAttributes })
};

// export const terrainType = {
//   water: {
//     minHeight: 0.2,
//     maxHeight: 0.4,
//     minColor: new Color('#1e40af'),
//     maxColor: new Color('#38bdf8')
//   },
//   lowSand: {
//     minHeight: 0.4,
//     maxHeight: 0.425,
//     minColor: new Color('#fde68a'),
//     maxColor: new Color('#fcd34d')
//   },
//   highSand: {
//     minHeight: 0.425,
//     maxHeight: 0.45,
//     minColor: new Color('#fcd34d'),
//     maxColor: new Color('#86efac')
//   },
//   grass: {
//     minHeight: 0.45,
//     maxHeight: 0.7,
//     minColor: new Color('#86efac'),
//     maxColor: new Color('#22c55e')
//   },
//   tree: {
//     minHeight: 0.7,
//     maxHeight: 0.75,
//     minColor: new Color('#22c55e'),
//     maxColor: new Color('#d1d5db')
//   },
// };

const water = "#70b3ff";
const outline = "#71717a";
const sand = "#BCD6B5";
const grass = "#80BC7F";
const mountain = "#7EB37B";

export const terrainType = {
  water: {
    minHeight: 0.2,
    maxHeight: 0.4,
    minColor: new Color(water),
    maxColor: new Color(water)
  },
  waterOutline: {
    minHeight: 0.4,
    maxHeight: 0.405,
    minColor: new Color(outline),
    maxColor: new Color(outline)
  },
  sand: {
    minHeight: 0.4,
    maxHeight: 0.45,
    minColor: new Color(sand),
    maxColor: new Color(sand)
  },
  sandOutline: {
    minHeight: 0.45,
    maxHeight: 0.455,
    minColor: new Color(outline),
    maxColor: new Color(outline)
  },
  grass: {
    minHeight: 0.455,
    maxHeight: 0.7,
    minColor: new Color(grass),
    maxColor: new Color(grass)
  },
  grassOutline: {
    minHeight: 0.7,
    maxHeight: 0.705,
    minColor: new Color(outline),
    maxColor: new Color(outline)
  },
  mountain: {
    minHeight: 0.705,
    maxHeight: 0.75,
    minColor: new Color(mountain),
    maxColor: new Color(mountain)
  },
};
