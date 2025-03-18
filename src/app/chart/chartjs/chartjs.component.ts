import { Component, input, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { generateBellCurveData, generateHistogramData } from '../util';
import { ChartDataPoint } from '../interfaces';
import { FruitProduction } from '../../types/fruitProduction.type';

Chart.register(...registerables, annotationPlugin);

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
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    public barChartOptions: ChartConfiguration['options'];
    public barChartData: ChartData<any, ChartDataPoint[]> = { datasets: [] };

    ngOnInit(): void {
        this.barChartOptions = this.prepareChartOptions();
        this.prepareChartData();
    }

    prepareChartOptions(): ChartConfiguration['options'] {
        return {
            animation: false,
            responsive: true,
            scales: {
                x: {
                    grid: { display: false },
                    offset: false,
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X-Axis Text',
                    },
                    type: 'linear',
                },
                y: {
                    beginAtZero: true,
                    grid: { display: false },
                    title: {
                        display: true,
                        text: 'Y-Axis Text',
                    },
                },
            },
            plugins: { // https://github.com/chartjs/awesome#plugins
                title: {
                    display: true,
                    text: "ChartJs (ng2-charts)"
                },
                subtitle: {
                    display: true,
                    text: "Cp: 1.1, Cpk: 0.5",
                },
                legend: { display: true },
                annotation: {
                    annotations: {
                        // label1: {
                        //     backgroundColor: 'transparent',
                        //     content: ['Cp: 1.1', 'Cpk: 0.5'],
                        //     position: 'end',
                        //     type: 'label',
                        //     xAdjust: -10,
                        //     xValue: 'end',
                        //     yAdjust: -10,
                        //     yValue: 'end',
                        // },
                        line1: {
                            type: 'line',
                            xMin: 70,
                            xMax: 70,
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                                content: 'LSL 70',
                                display: true,
                                position: 'end',
                                backgroundColor: 'transparent',
                                color: 'red',
                            },
                        },
                        line2: {
                            type: 'line',
                            xMin: 125,
                            xMax: 125,
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                                content: 'USL 125',
                                display: true,
                                position: 'end',
                                backgroundColor: 'transparent',
                                color: 'red',
                            },
                        }
                    }
                }
            },
        };
    }

    prepareChartData(): void {
        const histogramData = generateHistogramData(this.data(), 20);
        const bellCurveData = generateBellCurveData(this.data(), 40);
        this.barChartData.labels = [];
        this.barChartData.datasets.push({
            // backgroundColor: 'rgb(96, 54, 196)',
            barPercentage: 1.0, // Full width for the bar
            categoryPercentage: 1.0, // Full width for the category
            data: histogramData,
            label: "Histogram",
            parsing: {
                xAxisKey: 'x',
                yAxisKey: 'y'
            },
            type: 'bar',
        });
        this.barChartData.datasets.push({
            // backgroundColor: 'rgb(5, 56, 25)',
            data: bellCurveData,
            label: "Normal Distribution Bell Curve",
            parsing: {
                xAxisKey: 'x',
                yAxisKey: 'y'
            },
            pointStyle: false,
            type: 'line',
        });
    }

    prepareDataPoints(points: ChartDataPoint[]): [number, y: number][] {
        return points.map(point => { return [point.x, point.y] });
    }
}

// https://valor-software.com/ng2-charts/
// supported by all browsers, but content is not accessible to screen readers https://www.chartjs.org/docs/latest/general/accessibility.html
// https://www.chartjs.org/docs/latest/general/data-structures.html