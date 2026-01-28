import p5 from "p5";
import { Color } from "three";
import { useGameStore } from "../../../game/store";

const p = new p5((sketch) => {
  const lod = useGameStore.getState().lod;
  const falloff = useGameStore.getState().falloff;

  sketch.setup = () => {
    sketch.noCanvas();
    sketch.noiseDetail(lod, falloff);
  };
});

function normalize(value: number, min: number, max: number) {
  if (value > max) return 1;
  if (value < min) return 0;
  return (value - min) / (max - min); 
}

export function generateHeightMap() {
  const heightMapSize = useGameStore.getState().heightMapSize;
  const heightMapScale = useGameStore.getState().heightMapScale;
  const zoomScale = useGameStore.getState().zoomScale;
  const noiseSeed = useGameStore.getState().noiseSeed;
  
  const heightMap = new Array();
  p.noiseSeed(noiseSeed);

  for (let i = 0; i < heightMapSize; i++) {
    heightMap[i] = new Float32Array(heightMapSize);

    for (let j = 0; j < heightMapSize; j++) {
      const x = (i / heightMapSize) * heightMapScale;
      const y = (j / heightMapSize) * heightMapScale;
      const height = p.noise(x / zoomScale, y / zoomScale);
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