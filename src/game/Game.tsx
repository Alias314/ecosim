import { useCallback, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { generateHeightMap } from "../components/terrain/terrainUtils";
import Terrain from "../components/terrain/Terrain";
import GameSidebar from "./GameSidebar";
import Rabbit from "../components/entities/Rabbit";
import Wolf from "../components/entities/Wolf";

function Game() {
    const terrainRef = useRef(null);
    const [heightMap, setHeightMap] = useState(generateHeightMap());
    const [rabbits, setRabbits] = useState([]);
    const [wolves, setWolves] = useState([]);
    const rabbitStatusRef = useRef({});
    const rabbitPositionsRef = useRef({});

    useEffect(() => {
        const tempRabbits = [];
        const tempWolves = [];

        for (let i = 0; i < 200; i++) {
            tempRabbits.push({ id: i });
            rabbitStatusRef.current[i] = true;
        }

        for (let i = 0; i < 2; i++) {
            tempWolves.push(i);
        }

        setRabbits(tempRabbits);
        setWolves(tempWolves);
    }, []);

    const generateNewHeightMap = () => {
        setHeightMap(generateHeightMap());
    };

    return (
        <div className="w-screen h-screen absolute flex items-start justify-start bg-neutral-100">
            <Canvas camera={{ position: [8, 8, 8] }} shadows >
                <ambientLight intensity={0.5} />
                <directionalLight position={[15, 10, -15]} intensity={2} castShadow />
                <OrbitControls />

                <Physics gravity={[0, 0, 0]}>
                    <Terrain 
                        terrainRef={terrainRef} 
                        heightMap={heightMap}
                    />

                    {rabbits.map((rabbit) => (
                        <Rabbit 
                            key={rabbit.id}
                            id={rabbit.id}
                            rabbitStatusRef={rabbitStatusRef}
                            rabbitPositionsRef={rabbitPositionsRef}
                            terrainRef={terrainRef}
                            heightMap={heightMap}
                        />
                    ))}

                    {wolves.map((id) => (
                        <Wolf 
                            key={id}
                            rabbitStatusRef={rabbitStatusRef}
                            rabbitPositionsRef={rabbitPositionsRef}
                            terrainRef={terrainRef}
                            heightMap={heightMap}
                        />
                    ))}
                </Physics>
            </Canvas>

            <GameSidebar generateNewHeightMap={generateNewHeightMap} />
        </div>
    );
}

export default Game;