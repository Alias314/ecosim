import { create } from "zustand";

interface GameState {
    terrainSize: number;
    terrainHeight: number;
    heightMapSize: number;
    heightMapScale: number;
    zoomScale: number;
    lod: number;
    falloff: number;
    noiseSeed: number;
    setValue: (key: keyof GameState, value: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
    terrainSize: 256,
    terrainHeight: 4,
    heightMapSize: 256,
    heightMapScale: 3,
    zoomScale: 1.5,
    lod: 9,
    falloff: 0.5,
    noiseSeed: Math.floor(Math.random() * 100000),

    setValue: (key, value) => set((state) => ({
        ...state,
        [key]: value
    }))
}));