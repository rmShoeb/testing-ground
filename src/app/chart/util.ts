import { mean, standardDeviation } from 'simple-statistics';
import { FruitProduction } from './chart.component';
import { ChartDataPoint } from './interfaces';

export function generateHistogramData(data: FruitProduction[], binCount: number): ChartDataPoint[] {
    const numericValues = data.map(obj => obj.produced);
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);
    const binSize = (max - min) / binCount;
    const bins: number[] = Array(binCount).fill(0);

    numericValues.forEach((value) => {
        const binIndex = Math.min(
            Math.floor((value - min) / binSize),
            binCount - 1
        );
        bins[binIndex]++;
    });

    return bins.map((count, index) => ({
        x: min + binSize * index + binSize / 2,
        y: count,
    }));
}

export function generateBellCurveData(data: FruitProduction[], points: number): ChartDataPoint[] {
    const numericValues = data.map(obj => obj.produced);
    const avg = mean(numericValues);
    const stdDev = standardDeviation(numericValues);
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);
    const step = (max - min) / points;

    return Array.from({ length: points }, (_, i) => {
        const x = min + i * step;
        const y =
            (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
            Math.exp(-0.5 * ((x - avg) / stdDev) ** 2);
        return { x, y };
    });
}