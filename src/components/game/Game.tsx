import { useEffect, useRef, useState } from "react";
import Scene from "../canvas/scene/Scene";
import { generateHeightMap } from '../../utils/terrain';
import Sidebar from "../sidebar/Sidebar";
import { spawnEntities } from "../../utils/entity";

const Game = () => {
  const [rabbits, setRabbits] = useState([]);
  const [wolves, setWolves] = useState([]);
  const [bushes, setBushes] = useState([]); 
  const entityAttributesRef = useRef({ rabbit: [], wolf: [], bush: [] });
  const [heightMap, setHeightMap] = useState(generateHeightMap());
  
  const generateNewHeightMap = () => {
    setHeightMap(generateHeightMap());
    generateEntities();
  };

  const generateEntities = () => {
    spawnEntities(
      400, 
      40,
      200,
      setRabbits, 
      setWolves,
      setBushes,
      entityAttributesRef,
      heightMap
    );
  }
  
  useEffect(() => {
    generateEntities();
  }, []);

  return (
    <div className="w-screen h-screen">
      <Scene 
        rabbits={rabbits}
        wolves={wolves}
        bushes={bushes}
        entityAttributesRef={entityAttributesRef}
        heightMap={heightMap} 
      />
      <Sidebar 
        generateNewHeightMap={generateNewHeightMap} 
        generateEntities={generateEntities} 
      />
    </div>
  );
};

export default Game;
