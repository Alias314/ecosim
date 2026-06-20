
export const sidebarFields = [
  {
    id: 1,
    title: "Terrain Size",
    key: "size",
    min: 1,
    max: 512,
    step: 1
  },
  {
    id: 4,
    title: "Height Map Scale",
    key: "heightMapScale",
    min: 1,
    max: 32,
    step: 1
  },
  {
    id: 5,
    title: "Zoom",
    key: "zoom",
    min: 1,
    max: 10,
    step: 0.1
  },
  {
    id: 6,
    title: "LOD",
    key: "lod",
    min: 1,
    max: 12,
    step: 1
  },
  {
    id: 7,
    title: "Falloff",
    key: "falloff",
    min: 0,
    max: 1,
    step: 0.1
  },
  {
    id: 8,
    title: "Seed",
    key: "seed",
    min: 1,
    max: 100000,
    step: 1,
    enableRandomizer: true
  },
]