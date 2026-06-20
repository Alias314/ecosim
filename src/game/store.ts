import { defaultTerrainAttributes } from "@/constants/terrain";
import { create } from "zustand";

interface PopulationSample {
    time: number;
    rabbits: number;
    wolves: number;
    bushes: number;
}

interface GameState {
    terrainSize: number;
    terrainHeight: number;
    heightMapSize: number;
    heightMapScale: number;
    zoomScale: number;
    lod: number;
    falloff: number;
    noiseSeed: number;
    populationHistory: PopulationSample[];
    setValue: (key: keyof GameState, value: number) => void;
    addPopulationSample: (sample: PopulationSample) => void;
}

export const useGameStore = create<GameState>((set) => ({
    terrainSize: defaultTerrainAttributes.size,
    terrainHeight: defaultTerrainAttributes.height,
    heightMapSize: defaultTerrainAttributes.heightMapSize,
    heightMapScale: defaultTerrainAttributes.heightMapScale,
    zoomScale: defaultTerrainAttributes.zoom,
    lod: defaultTerrainAttributes.lod,
    falloff: defaultTerrainAttributes.falloff,
    noiseSeed: defaultTerrainAttributes.seed,
    populationHistory: [],

    setValue: (key, value) => set((state) => ({
        ...state,
        [key]: value
    })),

    addPopulationSample: (sample) => set((state) => {
        const newData = [...state.populationHistory, sample];
        return { populationHistory: newData };
    })
}));