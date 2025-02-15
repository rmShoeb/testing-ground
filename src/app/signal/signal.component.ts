import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxHtmlEditorModule, DxNumberBoxModule } from 'devextreme-angular';

@Component({
    selector: 'app-signal',
    imports: [
        DxHtmlEditorModule,
        DxNumberBoxModule ,
        FormsModule
    ],
    templateUrl: './signal.component.html',
    styleUrl: './signal.component.css'
})
export class SignalComponent {
    comment = signal("");
    target = signal<number>(0);
    tolerance = signal<number>(0);
    minimum = computed(() => {
        return this.target() - this.tolerance();
    });
    maximum = computed(() => {
        return this.target() + this.tolerance();
    });
    
    constructor() {}
}