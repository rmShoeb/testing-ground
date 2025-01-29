import { CHART } from "./enums";

export interface DevExChart {
    name: string;
    type: CHART;
    dataSource?: ChartDataPoint[];
    argumentField: string;
    valueField: string;
    barWidth?: number;
    barPadding?: number;
    lineWidth?: number;
    color?: string;
}

export interface ChartDataPoint {
    x: number;
    y: number;
}

export interface PlotlyChart {
    data: any[];
    layout?: any;
    config?: any;
}