import { Component, input } from '@angular/core';
import { FruitProduction } from '../chart.component';

@Component({
    selector: 'ngx-charts-test',
    standalone: true,
    imports: [],
    templateUrl: './ngx-charts.component.html',
    styleUrl: './ngx-charts.component.css'
})
export class NgxChartsComponent {
    data = input.required<FruitProduction[]>();
}
