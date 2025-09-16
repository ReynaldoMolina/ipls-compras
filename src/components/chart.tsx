'use client';

import { BarChart, Bar, CartesianGrid, XAxis, LabelList } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { ChartData } from '@/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { formatter } from './tables/number-cell';
import { TrendingUp } from 'lucide-react';

const chartConfig = {
  presupuesto: {
    label: 'Presupuestado',
    color: 'var(--chart-1)',
  },
  asignado: {
    label: 'Asignado',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export default function Chart({ chartData }: { chartData: ChartData[] }) {
  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Presupuesto</CardTitle>
        <CardDescription>Enero - Diciembre 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="entidad_academica"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="presupuesto"
              fill="var(--color-presupuesto)"
              radius={4}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={11}
                formatter={(value: number) => formatter.format(value)}
              />
            </Bar>
            <Bar dataKey="asignado" fill="var(--color-asignado)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={11}
                formatter={(value: number) => formatter.format(value)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
