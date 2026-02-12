import type { FC } from 'react';
import { sidebarFields } from '../../constants/sidebar';
import Slider from '../../game/Slider';

interface SideBarProps {
  generateNewHeightMap: () => void;
  generateEntities: () => void;
}

const Sidebar: FC<SideBarProps> = ({ 
  generateNewHeightMap,
  generateEntities 
}) => {
  return (
    <div className="absolute top-0 w-[300px] m-2 p-4 bg-white border-2 rounded-xl">
      {sidebarFields.map((field) => (
        <Slider 
          key={field.id}
          title={field.title}
          storeKey={field.storeKey}
          min={field.min}
          max={field.max}
          step={field.step}
          enableRandomizer={field.enableRandomizer}
        />
      ))}
      
      <button
        className="my-2 px-2 text-lg border rounded-md hover:bg-gray-200"
        onClick={generateNewHeightMap}
      >
        Generate terrain
      </button>
      <button
        className="px-2 text-lg border rounded-md hover:bg-gray-200"
        onClick={generateEntities}
      >
        Spawn entities
      </button>
    </div>
  );
};

export default Sidebar;