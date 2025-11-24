import Slider from "./Slider";

interface GameSidebarProps {
    generateNewHeightMap: () => void;
}

function GameSidebar({ generateNewHeightMap }: GameSidebarProps) {

    return (
        <div className="absolute w-[300px] m-2 p-4 bg-white border-2 rounded-xl">
            <Slider 
                title={'Terrain Size'} 
                storeKey={'terrainSize'}
                min={1}
                max={512}
                step={1}
            />
            <Slider 
                title={'Terrain Height'}
                storeKey={'terrainHeight'}
                min={1} 
                max={10} 
                step={0.1}
            />
            <Slider 
                title={'Height Map Size'}
                storeKey={'heightMapSize'}
                min={1} 
                max={512}
                step={1}
            />
            <Slider 
                title={'Height Map Scale'}
                storeKey={'heightMapScale'}
                min={1} 
                max={32}
                step={1}
            />
            <Slider 
                title={'Zoom'}
                storeKey={'zoomScale'}
                min={1} 
                max={10} 
                step={0.1}
            />
            <Slider 
                title={'LOD'}
                storeKey={'lod'}
                min={1}
                max={12} 
                step={1}
            />
            <Slider 
                title={'Falloff'}
                storeKey={'falloff'}
                min={0} 
                max={1}
                step={0.1}
            />
            <Slider 
                title={'Seed'}
                storeKey={'noiseSeed'}
                min={1}
                max={100000}
                step={1}
                enableRandomizer={true}
            />

            <button
                className="px-2 text-lg border rounded-md hover:bg-gray-200"
                onClick={generateNewHeightMap}
            >
                Generate Terrain
            </button>
        </div>
    );
}

export default GameSidebar;