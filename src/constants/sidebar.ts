
export const sidebarFields = [
  {
    id: 1,
    title: "Terrain Size",
    storeKey: "terrainSize",
    min: 1,
    max: 512,
    step: 1
  },
  {
    id: 3,
    title: "Height Map Size",
    storeKey: "heightMapSize",
    min: 1,
    max: 512,
    step: 1
  },
  {
    id: 4,
    title: "Height Map Scale",
    storeKey: "heightMapScale",
    min: 1,
    max: 32,
    step: 1
  },
  {
    id: 5,
    title: "Zoom",
    storeKey: "zoomScale",
    min: 1,
    max: 10,
    step: 0.1
  },
  {
    id: 6,
    title: "LOD",
    storeKey: "lod",
    min: 1,
    max: 12,
    step: 1
  },
  {
    id: 7,
    title: "Falloff",
    storeKey: "falloff",
    min: 0,
    max: 1,
    step: 0.1
  },
  {
    id: 8,
    title: "Seed",
    storeKey: "noiseSeed",
    min: 1,
    max: 100000,
    step: 1,
    enableRandomizer: true
  },
]