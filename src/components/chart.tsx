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
  CardHeader,
  CardTitle,
} from './ui/card';
import { formatNumber } from '@/lib/formatters';
import FormHeader from './forms/elements/form-header';

interface ChartProps {
  chartData: ChartData[];
  chartConfig: ChartConfig;
  title?: string;
  description?: string;
  dataKeyX?: string;
}

export default function Chart({
  chartData,
  chartConfig,
  title = 'Gráfico',
  description = '',
  dataKeyX = 'entidad_academica',
}: ChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="inline-flex flex-col space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKeyX}
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            {Object.entries(chartConfig).map(([key, { color }]) => (
              <Bar key={key} dataKey={key} fill={color} radius={4}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={11}
                  formatter={(value: number) => formatNumber(value)}
                />
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
