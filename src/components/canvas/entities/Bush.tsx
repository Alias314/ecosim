import { useRef } from "react";
import { bush } from "../../../constants/entity";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";

const Bush = ({ id, position, entityAttributesRef }) => {
  const meshRef = useRef();
  
  useHandleDeadEntity(
    id,
    meshRef,
    entityAttributesRef.current.bush
  );

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[bush.size]} />
      <meshStandardMaterial 
        color={"#06b300"}
        opacity={0.8} 
        transparent 
      />
    </mesh>
  );
};

export default Bush;