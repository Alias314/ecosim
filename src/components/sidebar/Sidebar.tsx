import type { FC } from 'react';
import { sidebarFields } from '../../constants/sidebar';
import Slider from './Slider';

interface SideBarProps {
  generateTerrain: () => void;
  generateEntities: () => void;
}

const Sidebar: FC<SideBarProps> = ({ 
  sliderTerrainAttributes,
  setSliderTerrainAttributes,
  generateTerrain,
  generateEntities 
}) => {
  return (
    <div className="w-[450px] p-4 bg-zinc-700">
      <h2 className="text-2xl text-gray-100 font-semibold">Terrain</h2>

      {sidebarFields.map((field) => (
        <Slider 
          key={field.id}
          title={field.title}
          keyTitle={field.key}
          min={field.min}
          max={field.max}
          step={field.step}
          enableRandomizer={field.enableRandomizer}
          sliderTerrainAttributes={sliderTerrainAttributes}
          setSliderTerrainAttributes={setSliderTerrainAttributes}
        />
      ))}
      
      <button
        className="my-2 px-2 text-lg border rounded-md bg-white hover:bg-gray-300"
        onClick={generateTerrain}
      >
        Generate terrain
      </button>

      <button
        className="px-2 text-lg border rounded-md bg-white hover:bg-gray-300"
        onClick={generateEntities}
      >
        Spawn entities
      </button>
    </div>
  );
};

export default Sidebar;