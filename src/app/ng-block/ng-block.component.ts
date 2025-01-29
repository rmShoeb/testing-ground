import { Component, signal } from '@angular/core';
import { DxNumberBoxModule } from 'devextreme-angular';

@Component({
    selector: 'app-ng-block',
    standalone: true,
    imports: [
        DxNumberBoxModule
    ],
    templateUrl: './ng-block.component.html',
    styleUrl: './ng-block.component.css'
})
export class NgBlockComponent {
    marks = signal<number>(0);
}
