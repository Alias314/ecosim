import { Card, CardContent } from "../ui/card";
import { useGameStore } from "@/game/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faArrowsRotate,
  faMountainSun,
} from "@fortawesome/free-solid-svg-icons";

const LabeledSlider = ({ label, value, min, max, step, onChange }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-sm font-medium text-gray-700">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-3 rounded-md bg-gray-200 accent-zinc-800 appearance-none cursor-pointer"
    />
  </div>
);

const IconButton = ({ icon, label, onClick, primary }) => (
  <div className="relative group flex">
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex items-center justify-center w-10 h-10 border rounded-md cursor-pointer ${
        primary
          ? "bg-zinc-800 text-white hover:bg-zinc-700"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
      {label}
    </span>
  </div>
);

export default function ToolBar({ onSpawn, onRegenerateTerrain }) {
  const simulationSpeed = useGameStore((s) => s.simulationSpeed);
  const preySpeed = useGameStore((s) => s.preySpeed);
  const predatorSpeed = useGameStore((s) => s.predatorSpeed);
  const preyCount = useGameStore((s) => s.preyCount);
  const predatorCount = useGameStore((s) => s.predatorCount);
  const plantSpawnRate = useGameStore((s) => s.plantSpawnRate);
  const setValue = useGameStore((s) => s.setValue);

  return (
    <Card className="m-2 absolute bottom-0 left-0 right-0 overflow-visible bg-white/90 backdrop-blur border-1">
      <CardContent className="flex gap-6">
        <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3">
          <LabeledSlider
            label="Simulation Speed"
            value={simulationSpeed}
            min={0}
            max={10}
            step={0.25}
            onChange={(v) => setValue("simulationSpeed", v)}
          />
          <LabeledSlider
            label="Prey Speed"
            value={preySpeed}
            min={0}
            max={60}
            step={1}
            onChange={(v) => setValue("preySpeed", v)}
          />
          <LabeledSlider
            label="Predator Speed"
            value={predatorSpeed}
            min={0}
            max={60}
            step={1}
            onChange={(v) => setValue("predatorSpeed", v)}
          />
          <LabeledSlider
            label="Prey"
            value={preyCount}
            min={0}
            max={500}
            step={1}
            onChange={(v) => setValue("preyCount", v)}
          />
          <LabeledSlider
            label="Predators"
            value={predatorCount}
            min={0}
            max={500}
            step={1}
            onChange={(v) => setValue("predatorCount", v)}
          />
          <LabeledSlider
            label="Plant Spawn Rate"
            value={plantSpawnRate}
            min={0}
            max={200}
            step={1}
            onChange={(v) => setValue("plantSpawnRate", v)}
          />
        </div>

        <div className="flex items-center justify-center gap-2 border-l border-gray-300 pl-6">
          <IconButton
            icon={simulationSpeed === 0 ? faPlay : faPause}
            label={simulationSpeed === 0 ? "Play" : "Pause"}
            primary
            onClick={() => setValue("simulationSpeed", simulationSpeed === 0 ? 1 : 0)}
          />
          <IconButton
            icon={faArrowsRotate}
            label="Spawn / Reset"
            onClick={onSpawn}
          />
          <IconButton
            icon={faMountainSun}
            label="New Terrain"
            onClick={onRegenerateTerrain}
          />
        </div>
      </CardContent>
    </Card>
  );
}
