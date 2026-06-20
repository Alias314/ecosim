import { useRef } from "react";
import { bush } from "../../../constants/entity";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";
import useHandleEntityPosition from "../../hooks/useHandleEntityPosition";
import { Outlines } from "@react-three/drei";

const Bush = ({ id, entityAttributes }) => {
  const meshRef = useRef();

  useHandleEntityPosition(id, meshRef, entityAttributes.bush);

  useHandleDeadEntity(id, meshRef, entityAttributes.bush);

  return (
    <mesh ref={meshRef} position={entityAttributes.bush[id].position}>
      <icosahedronGeometry args={[bush.size]} />
      <meshBasicMaterial color={"#17b612"} />
      <Outlines thickness={1} color={"black"} />
    </mesh>
  );
};

export default Bush;
