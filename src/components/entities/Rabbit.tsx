import { useRef, useEffect } from "react";
import { Mesh, Raycaster, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

interface RabbitProps {
    terrainRef: React.RefObject<Mesh | null>;
    rabbits: React.MutableRefObject<{ body: RapierRigidBody; direction: Vector3 }[]>;
}

function Rabbit({ terrainRef, rabbits }: RabbitProps) {
    const bodyRef = useRef<RapierRigidBody | null>(null);
    const meshRef = useRef<Mesh | null>(null);
    const direction = new Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();

    useEffect(() => {
        if (bodyRef.current) rabbits.current.push({
            body: bodyRef.current,
            direction: direction
        })

        return () => {
            rabbits.current = rabbits.current.filter(r => r.body !== bodyRef.current);
        }
    }, []);

    return (
        <RigidBody type="kinematicPosition" colliders="ball" ref={bodyRef}>
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <icosahedronGeometry args={[0.4, 3]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
        </RigidBody>
    );
}

export default Rabbit;