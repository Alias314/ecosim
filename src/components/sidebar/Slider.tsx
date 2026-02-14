import { useGameStore } from "../../game/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { Label } from "radix-ui";

interface SliderProps {
  title: String;
  storeKey: keyof ReturnType<typeof useGameStore.getState>;
  min: number;
  max: number;
  step: number;
  enableRandomizer: boolean;
  setFunction: (val: number) => void;
}

function Slider({
  title,
  storeKey,
  min,
  max,
  step,
  enableRandomizer,
}: SliderProps) {
  const value = useGameStore((state) => state[storeKey] as number);
  const setValue = useGameStore((state) => state.setValue);

  const handleInputChange = (e) => {
    let inputValue = parseFloat(e.target.value);

    if (inputValue < min) inputValue = min;
    if (inputValue > max) inputValue = max;

    setValue(storeKey, inputValue);
  };

  const generateRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 100000);
    setValue("noiseSeed", newSeed);
  };

  return (
    <div className="w-full flex-col">
      <div className="w-full flex justify-between">
        <Label.Root className="text-gray-100">{title}</Label.Root>

        <div>
          <input
            className="w-22 px-2 text-gray-100 text-end bg-[#2A2B34] rounded-md"
            type="number"
            value={value}
            step={step}
            min={min}
            max={max}
            onChange={handleInputChange}
          />

          {enableRandomizer && (
            <button onClick={generateRandomSeed} className="cursor-pointer">
              <FontAwesomeIcon icon={faShuffle} />
            </button>
          )}
        </div>
      </div>

      {/* {!enableRandomizer && (
        <input
          className="w-full bg-amber-500 rounded-md"
          type="range"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={handleInputChange}
        />
      )} */}
    </div>
  );
}

export default Slider;
