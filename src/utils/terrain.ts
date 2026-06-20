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