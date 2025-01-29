import { Component, input } from '@angular/core';
import { FruitProduction } from '../chart.component';

@Component({
    selector: 'chartjs',
    standalone: true,
    imports: [],
    templateUrl: './chartjs.component.html',
    styleUrl: './chartjs.component.css'
})
export class ChartjsComponent {
    data = input.required<FruitProduction[]>();
}
