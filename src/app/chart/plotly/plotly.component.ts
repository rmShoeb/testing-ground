import { Component, input, OnInit } from '@angular/core';
import { FruitProduction } from '../chart.component';
import { PlotlyModule } from 'angular-plotly.js';
import { generateHistogramData, generateBellCurveData } from '../util';
import * as PlotlyJS from 'plotly.js-dist-min';
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
            x: histogramData.map(point => point.x),
            y: histogramData.map(point => point.y),
            type: "bar",
            name: "Histogram"
        });
        this.chart.data.push({
            x: bellCurveData.map(point => point.x),
            y: bellCurveData.map(point => point.y * 250),
            type: "line",
            name: "Normal Distribution Bell Curve"
        });
    }

    prepareLayout() {
        this.chart.layout = {
            bargap: 0,
            title: {
                text: 'Plotly Angular Chart'
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
            annotations: [
                {
                    align: "left",
                    valign: "top",
                    text: "Cp: 1.1<br>Cpk: 0.1",
                    x: 1.1,
                    y: 0.5,
                    xref: 'paper',
                    yref: 'paper',
                    showarrow: false,
                },
            ],
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
            ],
            updatemenus: []
        };
    }

    prepareConfig() {
        this.chart.config = {
            scrollZoom: true,
            // staticPlot: true,
            toImageButtonOptions: {
                format: 'svg', // one of png, svg, jpeg, webp
                filename: 'custom_image',
                height: 500,
                width: 700,
                scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
            },
            displayModeBar: true,
            // modeBarButtonsToRemove: ['toImage'], // https://plotly.com/javascript/configuration-options/#remove-modebar-buttons
            displaylogo: false
        };
    }
}
