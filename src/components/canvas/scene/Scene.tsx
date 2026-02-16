import { useRef } from "react";
import Terrain from "../terrain/Terrain";
import Bush from "../entities/Bush";
import CameraController from "./CameraController";
import Rabbit from "../entities/Rabbit";
import Wolf from "../entities/Wolf";
import { initEntityPool, initSpawnEntity } from "../../../utils/entity";
import { generateHeightMap } from "../../../utils/terrain";
import useSpawnEntityInterval from "../../hooks/useSpawnEntityInterval";
import { bush, rabbit } from "../../../constants/entity";

const Scene = () => {
  const terrainRef = useRef(null);
  const entityAttributesRef = useRef({ rabbit: [], wolf: [], bush: [] });
  const heightMap = generateHeightMap();

  initEntityPool(entityAttributesRef, heightMap);
  initSpawnEntity(400, 15, 200, entityAttributesRef, heightMap);
  useSpawnEntityInterval(bush, entityAttributesRef.current.bush, heightMap);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[15, 10, -15]} intensity={2} castShadow />
      <CameraController terrainRef={terrainRef} />
      <Terrain terrainRef={terrainRef} heightMap={heightMap} />
      <gridHelper position={[5, 0, 5]} args={[200, 100]} />
      
      {entityAttributesRef.current.rabbit.map((rabbit) => (
        <Rabbit
          key={rabbit.id}
          id={rabbit.id}
          position={rabbit.position}
          entityAttributesRef={entityAttributesRef}
          heightMap={heightMap}
        />
      ))}

      {entityAttributesRef.current.wolf.map((wolf) => (
        <Wolf
          key={wolf.id}
          id={wolf.id}
          position={wolf.position}
          entityAttributesRef={entityAttributesRef}
          heightMap={heightMap}
        />
      ))}

      {entityAttributesRef.current.bush.map((bush) => (
        <Bush 
          key={bush.id}
          id={bush.id}
          entityAttributesRef={entityAttributesRef}
        />
      ))}
    </>
  );
};

export default Scene;
