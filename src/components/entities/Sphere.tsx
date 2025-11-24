import { useEffect, useRef } from "react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3, Mesh, Raycaster, MathUtils } from "three";
import { useGameStore } from "../../game/store";

interface SphereProps {
    terrainRef: React.RefObject<Mesh | null>
};

function Sphere({ terrainRef, heightMap }: SphereProps) {
    const terrainSize = useGameStore((state) => state.terrainSize);

    const bodyRef = useRef<RapierRigidBody | null>(null);
    const newPos = new Vector3();
    const time = useRef(0);
    const speed = 0.1;
    const direction = useRef({x: 0, z: 0});

    useFrame((_, delta) => {
        if (!bodyRef.current || !terrainRef.current) return;

        time.current += delta * speed;

        const bodyPos = bodyRef.current.translation();        
        const indexX = Math.floor(terrainSize / 10 * bodyPos.x);
        const indexZ = Math.floor(terrainSize / 10 * bodyPos.z);
        const nextY = heightMap[indexZ][indexX] < 0.4 ? 0.4 : heightMap[indexZ][indexX];
        
        let nextX = bodyPos.x + direction.current.x * 10;
        let nextZ = bodyPos.z + direction.current.z * 10;

        if (nextX < 0) nextX = 0.01;
        if (nextX > 10) nextX = 9.99;
        if (nextZ < 0) nextZ = 0;
        if (nextZ > 10) nextZ = 9.99;

        newPos.set(
            nextX,
            nextY * 4 + 0.1,
            nextZ
        )

        bodyRef.current?.setNextKinematicTranslation(newPos);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const radian = MathUtils.degToRad(Math.random() * 360);
            direction.current.x = Math.cos(radian) / 100;
            direction.current.z = Math.sin(radian) / 100;
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <RigidBody 
            ref={bodyRef}
            position={[5, 0, 5]} 
            type="kinematicPosition" 
            colliders="ball"
        >
            <mesh position={[0, 0, 0]}>
                <icosahedronGeometry args={[0.1, 2]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
        </RigidBody>
    );
}

export default Sphere;