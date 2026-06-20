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
    simulationSpeed: number;
    preySpeed: number;
    predatorSpeed: number;
    preyCount: number;
    predatorCount: number;
    plantCount: number;
    plantSpawnRate: number;
    populationHistory: PopulationSample[];
    setValue: (key: keyof GameState, value: number) => void;
    addPopulationSample: (sample: PopulationSample) => void;
    resetPopulationHistory: () => void;
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
    simulationSpeed: 1,
    preySpeed: 6,
    predatorSpeed: 6,
    preyCount: 300,
    predatorCount: 10,
    plantCount: 200,
    plantSpawnRate: 50,
    populationHistory: [],

    setValue: (key, value) => set((state) => ({
        ...state,
        [key]: value
    })),

    addPopulationSample: (sample) => set((state) => {
        const newData = [...state.populationHistory, sample];
        return { populationHistory: newData };
    }),

    resetPopulationHistory: () => set({ populationHistory: [] })
}));