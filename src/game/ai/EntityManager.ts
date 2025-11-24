import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import { Raycaster, Vector3, Mesh } from "three";

interface RabbitEntity {
    body: RapierRigidBody;
    direction: Vector3;
}

interface EntityManagerProps {
    rabbits: RabbitEntity[];
    terrainRef: React.RefObject<Mesh | null>;
}

function EntityManager({ rabbits, terrainRef }: EntityManagerProps) {
    const raycaster = new Raycaster();
    const rayDirection = new Vector3(0, -1, 0);
    const rayOrigin = new Vector3();

    useFrame(() => {
        for (let entity of rabbits) {
            const { body, direction } = entity;
            if (!body || !terrainRef.current) continue;

            const bodyPos = body.translation();
            const newPos = new Vector3(
                bodyPos.x + direction.x * 0.5,
                bodyPos.y,
                bodyPos.z + direction.z * 0.5
            )

            rayOrigin.set(newPos.x, newPos.y + 5, newPos.z);
            raycaster.set(rayOrigin, rayDirection);
            const hit = raycaster.intersectObject(terrainRef.current, false)[0];
            if (hit) newPos.y = hit.point.y + 0.5;

            body.setNextKinematicTranslation(newPos);
        }
    });
    
    return null;
}

export default EntityManager;