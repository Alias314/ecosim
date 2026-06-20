import { useGameStore } from "../../game/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { Label } from "radix-ui";
import { getRandomIntAtRange } from "../../utils/math";

const Slider = ({
  title,
  keyTitle,
  min,
  max,
  step,
  enableRandomizer,
  sliderTerrainAttributes,
  setSliderTerrainAttributes
}) => {
  const handleInputChange = (e) => {
    let inputValue = parseFloat(e.target.value);

    if (inputValue < min) inputValue = min;
    if (inputValue > max) inputValue = max;

    setSliderTerrainAttributes(prev => ({
      ...prev,
      [keyTitle]: inputValue
    }));
  };

  const generateRandomSeed = () => {
    const newSeed = getRandomIntAtRange(100000, 999999);

    setSliderTerrainAttributes(prev => ({
      ...prev,
      [keyTitle]: newSeed
    }));
  };

  return (
    <div className="w-full flex-col mb-3">
      <div className="w-full flex justify-between mb-1">
        <label className="font-semibold text-gray-100">{title}</label>

        <div>
          {enableRandomizer && (
            <button onClick={generateRandomSeed} className="me-2 cursor-pointer">
              <FontAwesomeIcon icon={faShuffle} color="white" />
            </button>
          )}

          <input
            className="w-22 px-2 font-semibold text-gray-900 text-end bg-gray-100 rounded-md no-spinner"
            type="number"
            value={sliderTerrainAttributes[keyTitle]}
            step={step}
            min={min}
            max={max}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {!enableRandomizer && (
        <input
          className="w-full h-4 rounded-md bg-gray-100 accent-zinc-800 appearance-none cursor-pointer"
          type="range"
          value={sliderTerrainAttributes[keyTitle]}
          step={step}
          min={min}
          max={max}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Slider;