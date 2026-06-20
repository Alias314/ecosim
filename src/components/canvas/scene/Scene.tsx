import Terrain from "../terrain/Terrain";
import Bush from "../entities/Bush";
import CameraController from "./CameraController";
import Rabbit from "../entities/Rabbit";
import Wolf from "../entities/Wolf";
import useSpawnEntityInterval from "../../hooks/useSpawnEntityInterval";
import { bush } from "../../../constants/entity";
import { Grid } from "@react-three/drei";
import usePopulationTracker from "@/components/hooks/usePopulationTracker";

const Scene = ({ entityAttributes, terrainAttributes }) => {
  useSpawnEntityInterval(
    bush,
    entityAttributes.bush,
    terrainAttributes.heightMap,
  );
  usePopulationTracker(entityAttributes);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[15, 10, -15]} intensity={2} castShadow />
      <CameraController />
      <Terrain heightMap={terrainAttributes.heightMap} />
      <Grid
        infiniteGrid
        cellSize={1.5}
        cellThickness={0.8}
        cellColor="#6f6f6f"
        sectionSize={1.5}
        sectionThickness={0.8}
        sectionColor="#6f6f6f"
        fadeDistance={15}
        position={[5, 0, 5]}
      />

      {entityAttributes.rabbit.map((rabbit) => (
        <Rabbit
          key={rabbit.id}
          id={rabbit.id}
          position={rabbit.position}
          entityAttributes={entityAttributes}
          heightMap={terrainAttributes.heightMap}
        />
      ))}

      {entityAttributes.wolf.map((wolf) => (
        <Wolf
          key={wolf.id}
          id={wolf.id}
          position={wolf.position}
          entityAttributes={entityAttributes}
          heightMap={terrainAttributes.heightMap}
        />
      ))}

      {entityAttributes.bush.map((bush) => (
        <Bush key={bush.id} id={bush.id} entityAttributes={entityAttributes} />
      ))}
    </>
  );
};

export default Scene;