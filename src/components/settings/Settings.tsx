import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Settings() {
  return (
    <Card className="flex-1 overflow-y-auto border-1">
      <CardHeader>
        <CardTitle>About EcoSim</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm text-gray-600">
        <p className="text-justify">
          EcoSim is a real-time 3D predator-prey simulation. The terrain is
          procedurally generated using Perlin noise and each entity (prey and
          predator) is moving using the Boids (bird-oid objects) algorithm. Both
          prey and predators follow a few states depending on the situation.
          They could be exploring, chasing, fleeing, breeding, or die of hunger
          if they don't find food. A live chart tracks population changes over
          time, and you can tune the speed, population size, and plant growth to
          your liking. If the terrain isn't to one's liking, then they could
          procedurally generate another terrain, possibly making the terrain
          even more dangerous to live in for prey if there's too much water.
        </p>

        <p>
          Built with React, TypeScript, and Three.js (React Three Fiber), plus
          p5.js for terrain noise (used in procedural generation) and Recharts
          for the live chart.
        </p>
      </CardContent>
    </Card>
  );
}
