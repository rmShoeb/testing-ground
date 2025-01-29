import { Component, input, OnInit } from '@angular/core';
import { DxChartModule } from 'devextreme-angular';
import { FruitProduction } from '../chart.component';
import { ChartDataPoint, DevExChart } from '../interfaces';
import { CHART } from '../enums';
import { generateBellCurveData, generateHistogramData } from '../util';

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
    histogramData: ChartDataPoint[] = [];
    bellCurveData: ChartDataPoint[] = [];
    chartList: DevExChart[];

    constructor() {
        this.chartList = this.createChartList();
    }

    ngOnInit(): void {
        this.prepareChartData();
    }
    
    prepareChartData(): void {
        this.histogramData = generateHistogramData(this.data(), 15)
        this.bellCurveData = generateBellCurveData(this.data(), 15);
    }

    createChartList(): DevExChart[] {
        return [
            {
                name: "Bar Chart",
                type: CHART.BAR,
                dataSource: this.histogramData,
                argumentField: "x",
                valueField: "y",
                barPadding: 0
            },
            {
                name: "Line Chart",
                type: CHART.SPLINE,
                dataSource: this.bellCurveData,
                argumentField: "x",
                valueField: "y",
            }
        ];
    }
}


/**
 * Show/Hide a series: https://js.devexpress.com/Angular/Documentation/Guide/UI_Components/Chart/Series/Show_and_Hide_a_Series/
 */