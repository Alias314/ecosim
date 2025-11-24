
function Tree({ position }) {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial />
        </mesh>
    );
}

export default Tree;