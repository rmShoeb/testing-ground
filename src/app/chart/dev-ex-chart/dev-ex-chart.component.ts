import { Component, input, OnInit } from '@angular/core';
import { DxChartModule } from 'devextreme-angular';
import { DevExChart } from '../interfaces';
import { CHART } from '../enums';
import { generateBellCurveData, generateHistogramData } from '../util';
import { FruitProduction } from '../../types/fruitProduction.type';

@Component({
    selector: 'dev-ex-chart',
    standalone: true,
    imports: [
        DxChartModule
    ],
    templateUrl: './dev-ex-chart.component.html',
    styleUrl: './dev-ex-chart.component.css'
})
export class DevExChartComponent implements OnInit {
    data = input.required<FruitProduction[]>();
    chartList: DevExChart[] = [];
    chartData: DevExChartData[] = [];

    constructor() { }

    ngOnInit(): void {
        this.chartList = this.createChartList();
        this.prepareChartData();
    }

    prepareChartData(): void {
        const histogramData = generateHistogramData(this.data(), 15)
        const bellCurveData = generateBellCurveData(this.data(), 15);
        this.chartData = histogramData.map((histPoint, index) => {
            const bellPoint = bellCurveData[index];
            return {
                histX: histPoint.x,
                histY: histPoint.y,
                bellX: bellPoint.x,
                bellY: bellPoint.y
            };
        });
    }

    createChartList(): DevExChart[] {
        return [
            {
                name: "Bar Chart",
                type: CHART.BAR,
                argumentField: "histX",
                valueField: "histY",
                barPadding: 0
            },
            {
                name: "Line Chart",
                type: CHART.SPLINE,
                argumentField: "bellX",
                valueField: "bellY",
            }
        ];
    }
}

export interface DevExChartData {
    histX: number;
    histY: number;
    bellX: number;
    bellY: number;
}


/**
 * Show/Hide a series: https://js.devexpress.com/Angular/Documentation/Guide/UI_Components/Chart/Series/Show_and_Hide_a_Series/
 */