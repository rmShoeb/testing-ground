import { ChangeDetectorRef, Component, NgZone, signal } from '@angular/core';
import { DxHtmlEditorModule } from 'devextreme-angular';

@Component({
    selector: 'app-signal',
    standalone: true,
    imports: [
        DxHtmlEditorModule
    ],
    templateUrl: './signal.component.html',
    styleUrl: './signal.component.css'
})
export class SignalComponent {
    comment = signal("");
    
    constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

    commentChanged(newValue: string) {
        this.ngZone.runOutsideAngular(() => {
            this.comment.set(newValue);
        });
    }

    detach() {
        this.cdr.detach();
    }

    attach() {
        this.cdr.reattach();
    }

    keyDownOccurred(event: KeyboardEvent) {
        event.stopImmediatePropagation();
        event.stopPropagation();
    }
}