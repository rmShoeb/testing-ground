import { Component, input, OnInit } from '@angular/core';
import { FruitProduction } from '../chart.component';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { generateHistogramData, generateBellCurveData } from '../util';
import { PlotlyChart } from '../interfaces';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
    selector: 'plotly-chart-test',
    standalone: true,
    imports: [
        PlotlyModule
    ],
    templateUrl: './plotly.component.html',
    styleUrl: './plotly.component.css'
})
export class PlotlyComponent implements OnInit {
    data = input.required<FruitProduction[]>();
    chart: PlotlyChart = { data: [] };

    constructor() { }

    ngOnInit(): void {
        this.prepareLayout();
        this.prepareChartData();
        this.prepareConfig();
    }

    prepareChartData() {
        const histogramData = generateHistogramData(this.data(), 20)
        const bellCurveData = generateBellCurveData(this.data(), 40);
        this.chart.data.push({
            type: "histogram",
            x: this.data().map(point => point.produced),
            // histfunc: "count" | "sum" | "avg" | "min" | "max"
            // https://plotly.com/javascript/reference/histogram/#histogram-histnorm
            nbinsx: 20,
            marker: {
                color: "#6be7ed",
                line: { width: 1 },
            },
            name: "Histogram"
        });
        this.chart.data.push({
            x: histogramData.map(point => point.x),
            y: histogramData.map(point => point.y),
            type: "bar",
            name: "Histogram using Bar Chart",
            marker: {
                line: { width: 1 },
            },
            visible: "legendonly",
        });
        this.chart.data.push({
            x: bellCurveData.map(point => point.x),
            y: bellCurveData.map(point => point.y),
            type: "line",
            name: "Normal Distribution Bell Curve"
        });
    }

    prepareLayout() {
        this.chart.layout = {
            bargap: 0,
            title: {
                text: 'Plotly Angular Chart',
                subtitle: {
                    text: "Cp: 1.1, Cpk: 0.1",
                }
            },
            xaxis: {
                title: {
                    text: "X-Axis Text"
                }
            },
            yaxis: {
                title: {
                    text: "Y-Axis Text"
                }
            },
            // annotations: [
            //     {
            //         align: "left",
            //         valign: "top",
            //         text: "Cp: 1.1<br>Cpk: 0.1",
            //         x: 1.1,
            //         y: 0.5,
            //         xref: 'paper',
            //         yref: 'paper',
            //         showarrow: false,
            //     },
            // ],
            // legend: {
            //     orientation: "h"
            // },
            shapes: [
                {
                    type: 'line',
                    x0: 70,
                    x1: 70,
                    y0: 0,
                    y1: 1,
                    xref: 'x',
                    yref: 'paper',
                    line: {
                        color: 'red',
                        width: 2,
                    },
                    label: {
                        text: 'LSL 70',
                        textposition: "end",
                        font: { size: 12, color: 'red' },
                        textangle: 0,
                    }
                },
                {
                    type: 'line',
                    x0: 125,
                    x1: 125,
                    y0: 0,
                    y1: 1,
                    xref: 'x',
                    yref: 'paper',
                    line: {
                        color: 'red',
                        width: 2,
                    },
                    label: {
                        text: 'USL 125',
                        textposition: "end",
                        font: { size: 12, color: 'red' },
                        textangle: 0,
                    }
                },
            ]
        };
    }

    prepareConfig() {
        this.chart.config = {
            displayModeBar: true,
            displaylogo: false,
            // modeBarButtonsToRemove: ['toImage'], // https://plotly.com/javascript/configuration-options/#remove-modebar-buttons
            // responsive: true,
            scrollZoom: true,
            // staticPlot: true,
            toImageButtonOptions: {
                // format: 'svg', // one of png, svg, jpeg, webp
                filename: 'custom_image',
                scale: 1
            },
        };
    }
}

// https://plotly.com/javascript
// https://github.com/plotly/angular-plotly.js