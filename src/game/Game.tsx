import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { generateHeightMap } from "../components/terrain/terrainUtils";
import Terrain from "../components/terrain/Terrain";
import Sphere from "../components/entities/Sphere";
import GameSidebar from "./GameSidebar";

function Game() {
    const terrainRef = useRef(null);
    const [heightMap, setHeightMap] = useState(generateHeightMap());
    const [spheres, setSpheres] = useState([]);
    const amountSphere = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (amountSphere.current == 20) return;

            const temp = [ ...spheres];
            temp.push(
                <Sphere
                    key={amountSphere.current}
                    terrainRef={terrainRef}
                    heightMap={heightMap}
                />
            )

            setSpheres(temp);
            amountSphere.current++;
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, [spheres]);

    const generateNewHeightMap = () => {
        console.log('works');
        setHeightMap(generateHeightMap());
    };

    return (
        <div className="w-screen h-screen absolute flex items-start justify-start bg-neutral-100">
            <Canvas camera={{ position: [13, 8, 13] }} shadows >
                <ambientLight intensity={0.5} />
                <directionalLight position={[15, 10, -15]} intensity={2} castShadow />
                <OrbitControls />

                <Physics gravity={[0, 0, 0]}>
                    <Terrain 
                        terrainRef={terrainRef} 
                        heightMap={heightMap}
                    />

                    {spheres}
                </Physics>
            </Canvas>

            <GameSidebar generateNewHeightMap={generateNewHeightMap} />
        </div>
    );
}

export default Game;