import { Component, input, OnInit, ViewChild } from '@angular/core';
import { FruitProduction } from '../chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { generateBellCurveData, generateHistogramData } from '../util';
import { ChartDataPoint } from '../interfaces';

@Component({
    selector: 'chartjs',
    standalone: true,
    imports: [
        BaseChartDirective
    ],
    templateUrl: './chartjs.component.html',
    styleUrl: './chartjs.component.css'
})
export class ChartjsComponent implements OnInit {
    data = input.required<FruitProduction[]>();
    @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

    public barChartOptions: ChartConfiguration<'bar'>['options'];
    public barChartData: ChartData<'bar', ChartDataPoint[]> = { datasets: [] };

    ngOnInit(): void {
        this.barChartOptions = this.prepareChartOptions();
        this.prepareChartData();
    }

    prepareChartOptions(): ChartConfiguration<'bar'>['options'] {
        return {
            animation: false,
            responsive: true,
            scales: {
                x: {
                    type: 'linear', // Use 'linear' scale for numeric X-axis
                    position: 'bottom',
                },
                y: {
                    beginAtZero: true,
                },
            },
            plugins: { // https://github.com/chartjs/awesome#plugins
                title: {
                    display: true,
                    text: "ChartJs (ng2-charts)"
                },
                legend: {
                    display: true
                },
            },
        };
    }

    prepareChartData(): void {
        const histogramData = generateHistogramData(this.data(), 20);
        const bellCurveData = generateBellCurveData(this.data(), 20);
        this.barChartData.labels = [];
        this.barChartData.datasets.push({
            data: histogramData,
            label: "Histogram",
            parsing: {
                xAxisKey: 'x',
                yAxisKey: 'y'
            }
        });
        this.barChartData.datasets.push({
            data: bellCurveData,
            label: "Normal Distribution Bell Curve",
            parsing: {
                xAxisKey: 'x',
                yAxisKey: 'y'
            }
        });
    }

    prepareDataPoints(points: ChartDataPoint[]): [number, y: number][] {
        return points.map(point => { return [point.x, point.y] });
    }
}

// https://valor-software.com/ng2-charts/
// supported by all browsers, but content is not accessible to screen readers https://www.chartjs.org/docs/latest/general/accessibility.html
// https://www.chartjs.org/docs/latest/general/data-structures.html