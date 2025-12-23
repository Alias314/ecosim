import { useEffect, useRef } from "react";
import { BallCollider, MeshCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3, Mesh, MathUtils } from "three";
import { useGameStore } from "../../game/store";

interface SphereProps {
    terrainRef: React.RefObject<Mesh | null>
};

function Rabbit({ id, rabbitStatusRef, rabbitPositionsRef, terrainRef, heightMap }: SphereProps) {
    const terrainSize = useGameStore((state) => state.terrainSize);
    const bodyRef = useRef<RapierRigidBody | null>(null);
    const newPos = new Vector3();
    const direction = useRef({x: 0, z: 0});
    const time = useRef(0);
    const interval = 0.2;
    const isOnWater = useRef(true);
    const speed = 5;
    const delay = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            delay.current = true;
        }, Math.random() * 200);
    }, []);

    useFrame((_, delta) => {
        if (!bodyRef.current || !terrainRef.current && !delay) return;

        if (!rabbitStatusRef.current[id]) {
            newPos.set(0, -10, 0);
            bodyRef.current.setNextKinematicTranslation(newPos);
            return;
        }

        time.current += delta;
        if (time.current >= interval) {
            const radian = MathUtils.degToRad(Math.random() * 360);
            direction.current.x = Math.cos(radian) / 100;
            direction.current.z = Math.sin(radian) / 100;
            time.current = 0;
        }

        const bodyPos = bodyRef.current.translation();
        let nextX = bodyPos.x + direction.current.x * speed;
        let nextZ = bodyPos.z + direction.current.z * speed;

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

        rabbitPositionsRef.current[id] = newPos.clone();
    });

    return (
        <RigidBody 
            ref={bodyRef}
            position={[5, 0, 5]} 
            type="kinematicPosition" 
        >
            <mesh position={[0, 0, 0]} visible={rabbitStatusRef.current[id]}>
                <icosahedronGeometry args={[0.05, 2]} />
                <meshStandardMaterial color={'red'} />
            </mesh>

            <BallCollider args={[1]}/>
        </RigidBody>
    );
}

export default Rabbit;