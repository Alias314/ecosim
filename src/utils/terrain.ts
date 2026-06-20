import p5 from "p5";
import { Color } from "three";

const p = new p5((sketch) => {
  sketch.setup = () => {
    sketch.noCanvas();
  };
});

function normalize(value: number, min: number, max: number) {
  if (value > max) return 1;
  if (value < min) return 0;
  return (value - min) / (max - min); 
}

// size: 512,
// height: 1,
// heightMapSize: 512,
// heightMapScale: 6,
// zoom: 1.5,
// lod: 9,
// falloff: 0.5,
// seed: getRandomIntAtRange(100000, 999999),
// boundary: {
//   x: { min: 0, max: 10 },
//   z: { min: 0, max: 10 },
//   offset: 0.01
// },
// heightMap: generateHeightMap()

export function generateHeightMap({ terrainAttributes }) {
  // const heightMapSize = useGameStore.getState().heightMapSize;
  // const heightMapScale = useGameStore.getState().heightMapScale;
  // const zoomScale = useGameStore.getState().zoomScale;
  // const noiseSeed = useGameStore.getState().noiseSeed;
  // const lod = useGameStore.getState().lod;
  // const falloff = useGameStore.getState().falloff;
  
  const heightMap = new Array();
  p.noiseDetail(terrainAttributes.lod, terrainAttributes.falloff);
  p.noiseSeed(terrainAttributes.seed);

  for (let i = 0; i < terrainAttributes.heightMapSize; i++) {
    heightMap[i] = new Float32Array(terrainAttributes.heightMapSize);

    for (let j = 0; j < terrainAttributes.heightMapSize; j++) {
      const x = (i / terrainAttributes.heightMapSize) * terrainAttributes.heightMapScale;
      const y = (j / terrainAttributes.heightMapSize) * terrainAttributes.heightMapScale;
      const height = p.noise(x / terrainAttributes.zoom, y / terrainAttributes.zoom);
      heightMap[i][j] = height;
    }
  }

  return heightMap;
}

export function getTerrainColor(noiseValue: number, biome) {
  const color = new Color();
  const normalized = normalize(noiseValue, biome.minHeight, biome.maxHeight);
  return color.lerpColors(biome.minColor, biome.maxColor, normalized);
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

export function getBlendedTerrainColor(noiseValue: number, terrainType) {
  const color = new Color();

  if (noiseValue <= terrainType.water.maxHeight) {
    color.copy(terrainType.water.minColor);
  } else if (noiseValue < terrainType.sand.maxHeight) {
    color.copy(terrainType.sand.minColor);
  } else if (noiseValue < terrainType.grass.maxHeight) {
    color.copy(terrainType.grass.minColor);
  } else {
    color.copy(terrainType.mountain.minColor);
  }

  const outlineColor = terrainType.waterOutline.minColor;
  const outlineWidth = 0.015; // increase for a thicker/softer fade

  const boundaries = [
    terrainType.water.maxHeight,  // water -> sand edge
    terrainType.sand.maxHeight,   // sand -> grass edge
    terrainType.grass.maxHeight,  // grass -> mountain edge
  ];

  for (const boundary of boundaries) {
    const distance = Math.abs(noiseValue - boundary);
    const blend = 1 - smoothstep(0, outlineWidth, distance);
    if (blend > 0) color.lerp(outlineColor, blend);
  }

  return color;
}