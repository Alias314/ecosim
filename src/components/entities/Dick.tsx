
function Box({ position, size }) {
    return (
        <mesh position={position}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={'red'} />
        </mesh>
    );
}

function Ball({ position, radius, boxHeight, amountLoop }) {
    const ball = [];

    for (let i = 0; i < amountLoop; i++) {
        for (let j = 0; j < amountLoop; j++) {
            const rand = Math.random();
            const x = radius * Math.cos(i) + (rand / 2 - rand);
            const y = radius * Math.cos(j) * Math.sin(i);
            const z = Math.random() * 20;
            const size = 0.1;

            ball.push(
                <Box 
                    position={[x + position[0], y + position[1], -z]}
                    size={[size, size * boxHeight, size]} 
                />
            )
        }
    }

    return (
        <>
            {ball}
        </>
    )
}

function Stem({ position, radius, boxHeight, erectosLength, amountLoop }) {
    const ball = [];

    for (let i = 0; i < amountLoop; i++) {
        for (let j = 0; j < amountLoop; j++) {
            const rand = Math.random();
            const x = radius * Math.cos(i) + (rand / 2 - rand);
            const y = radius * Math.cos(j) * Math.sin(i);
            const z = Math.random() * 20;
            const size = 0.1;

            ball.push(
                <Box 
                    position={[x + position[0], y + position[1] + erectosLength / 2, -z]}
                    size={[size, size * boxHeight + erectosLength, size]} 
                />
            )
        }
    }

    return (
        <>
            {ball}
        </>
    )
}

function Head({ position, radius, boxHeight, erectosLength, amountLoop }) {
    const ball = [];

    for (let i = 0; i < amountLoop; i++) {
        for (let j = 0; j < amountLoop; j++) {
            const rand = Math.random();
            const x = radius * Math.cos(i) + (rand / 2 - rand);
            const y = Math.sin(i);
            const z = Math.random() * 20;
            const size = 0.1;

            if (y < 0.1) continue;

            ball.push(
                <Box 
                    position={[x + position[0], y + position[1] + erectosLength, -z]}
                    size={[size, y * boxHeight, size]} 
                />
            )
        }
    }

    return (
        <>
            {ball}
        </>
    )
}

function Dick({ erectosLength }) {
    return (
        <>
            <Ball 
                position={[0, 0, 0]} 
                radius={2} 
                boxHeight={10}
                amountLoop={20}
            />
            <Ball 
                position={[5, 0, 0]} 
                radius={2} 
                boxHeight={10}
                amountLoop={20}
            />
            <Stem
                position={[2.5, 5, 0]} 
                radius={1} 
                boxHeight={70}
                erectosLength={erectosLength}
                amountLoop={10}
            />
            <Head
                position={[2.5, 9, 0]} 
                radius={2} 
                boxHeight={3}
                erectosLength={erectosLength}
                amountLoop={20}
            />
        </>
    );
}

export default Dick;