import { useRef } from "react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3, Mesh, MathUtils } from "three";
import { useGameStore } from "../../game/store";

interface SphereProps {
    terrainRef: React.RefObject<Mesh | null>
};

function Sphere({ terrainRef, heightMap }: SphereProps) {
    const terrainSize = useGameStore((state) => state.terrainSize);

    const bodyRef = useRef<RapierRigidBody | null>(null);
    const newPos = new Vector3();
    const direction = useRef({x: 0, z: 0});
    const time = useRef(0);
    const interval = 0.1;
    const isOnWater = useRef(true);

    useFrame((_, delta) => {
        if (!bodyRef.current || !terrainRef.current) return;

        time.current += delta;
        if (time.current >= interval) {
            const radian = MathUtils.degToRad(Math.random() * 360);
            direction.current.x = Math.cos(radian) / 100;
            direction.current.z = Math.sin(radian) / 100;
            time.current = 0;
        }

        const bodyPos = bodyRef.current.translation();        
        let nextX = bodyPos.x + direction.current.x * 10;
        let nextZ = bodyPos.z + direction.current.z * 10;

        if (nextX < 0) nextX = 0.01;
        if (nextX > 10) nextX = 9.99;
        if (nextZ < 0) nextZ = 0;
        if (nextZ > 10) nextZ = 9.99;
        
        const indexX = Math.floor(terrainSize / 10 * nextX);
        const indexZ = Math.floor(terrainSize / 10 * nextZ);
        const nextY = heightMap[indexZ][indexX] < 0.4 ? 0.4 : heightMap[indexZ][indexX];
        if (nextY > 0.4) isOnWater.current = false;
        if (nextY <= 0.4 && !isOnWater.current) return; 

        newPos.set(
            nextX,
            nextY * 4 + 0.05,
            nextZ
        )

        bodyRef.current.setNextKinematicTranslation(newPos);
    });

    return (
        <RigidBody 
            ref={bodyRef}
            position={[5, 0, 5]} 
            type="kinematicPosition" 
            colliders="ball"
        >
            <mesh position={[0, 0, 0]}>
                <icosahedronGeometry args={[0.05, 2]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
        </RigidBody>
    );
}

export default Sphere;