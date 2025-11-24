import { useRef } from "react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3, Mesh, Raycaster } from "three";
import { useGameStore } from "../../game/store";

interface SphereProps {
    terrainRef: React.RefObject<Mesh | null>
};

function Sphere({ terrainRef, heightMap }: SphereProps) {
    const terrainSize = useGameStore((state) => state.terrainSize);

    const bodyRef = useRef<RapierRigidBody | null>(null);
    const meshRef = useRef<Mesh | null>(null);
    const newPos = new Vector3();
    const time = useRef(0);
    const raycaster = new Raycaster();
    const rayDirection = new Vector3(0, -1, 0);
    const rayOrigin = new Vector3();
    const radius = 2.5;

    useFrame((_, delta) => {
        if (!bodyRef.current || !terrainRef.current || !meshRef.current) return;

        time.current += delta;

        const bodyPos = bodyRef.current.translation();
        const newX = Math.sin(time.current) * radius;
        const newZ = Math.cos(time.current) * radius;
        
        const currentX = bodyPos.x;
        const currentY = bodyPos.z;
        const indexX = Math.floor(terrainSize / 10 * currentX);
        const indexY = Math.floor(terrainSize / 10 * currentY);
        const newY = heightMap[indexY][indexX];

        newPos.set(
            newX + 5,
            newY * 4 + 0.5,
            newZ + 5,
        )
        
        bodyRef.current?.setNextKinematicTranslation(newPos);
    });

    return (
        <RigidBody ref={bodyRef} type="kinematicPosition" colliders="ball">
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <icosahedronGeometry args={[0.5, 2]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
        </RigidBody>
    );
}

export default Sphere;