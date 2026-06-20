import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGameStore } from "@/game/store";

const chartConfig = {
  rabbits: {
    label: "Prey",
    color: "#3b82f6",
  },
  wolves: {
    label: "Predators",
    color: "#ef4444",
  },
  bushes: {
    label: "Plants",
    color: "#22c55e",
  },
};

export function ChartLineMultiple() {
  const data = useGameStore((state) => state.populationHistory);

  return (
    <Card className="flex-1 border-1">
      <CardHeader>
        <CardTitle>Population</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full aspect-auto">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 15, right: 10, top: 10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={45}
              label={{
                value: "Population",
                angle: -90,
                position: "insideLeft",
                offset: -7,
                dy: 30,
                fill: "#888888",
                fontSize: 14,
              }}
            />

            <XAxis
              dataKey="time"
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              label={{
                value: "Time (seconds)",
                position: "insideBottom",
                offset: -17,
                fill: "#888888",
                fontSize: 14,
              }}
            />

            <ChartTooltip
              content={<ChartTooltipContent labelFormatter={(value) => `Time: ${value}s`} />}
            />

            <ChartLegend
              content={<ChartLegendContent />}
              className="text-[#888888] gap-6 pt-10"
            />

            <Line
              dataKey="rabbits"
              name={chartConfig.rabbits.label}
              type="monotone"
              stroke={chartConfig.rabbits.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              dataKey="wolves"
              name={chartConfig.wolves.label}
              type="monotone"
              stroke={chartConfig.wolves.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              dataKey="bushes"
              name={chartConfig.bushes.label}
              type="monotone"
              stroke={chartConfig.bushes.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
